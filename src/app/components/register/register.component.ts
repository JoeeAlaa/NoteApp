import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signValidators } from '../../shared/validators/validators';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  isLoading:boolean = false;
  errMsg:string = '';
  successMsg:string = '';
  signUpSub!:Subscription;
  setIntervalId:any;

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,signValidators.name],
    email:[null,signValidators.email],
    password:[null,signValidators.password],
    age:[null,signValidators.age],
    phone:[null,signValidators.phone]
  })

  registerSubmit(): void{
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.signUpSub = this._AuthService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          if (res.msg === 'done') {
            this.isLoading = false;
            this.registerForm.reset();
            this.successMsg = res.msg;
            this._ToastrService.success(res.msg,'Note');
            this.setIntervalId = setInterval(() => {              
              this._Router.navigate(['/login'])
            }, 2000);
          }          
        },
        error:(err)=>{
          this.isLoading = false;
          this.registerForm.get('email')?.reset();
          this.errMsg = err.error.msg
          this._ToastrService.error(err.error.msg,'Note');
        }
      })
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    this.signUpSub?.unsubscribe();
    clearInterval(this.setIntervalId);
  }
}
