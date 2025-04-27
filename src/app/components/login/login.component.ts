import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { signValidators } from '../../shared/validators/validators';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  isLoading:boolean = false;
  errMsg:string = '';
  successMsg:string = '';
  signInSub!:Subscription;
  setIntervalId:any;

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null,signValidators.email],
    password:[null,signValidators.password],
  })

  loginSubmit(): void{
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.signInSub = this._AuthService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{          
          if (res.msg === 'done') {
            this.isLoading = false;
            this.loginForm.reset();
            this.successMsg = res.msg;
            this._ToastrService.success(res.msg,'Note');
            localStorage.setItem('noteUserToken',res.token);
            this._AuthService.saveData();              
            this.setIntervalId = setInterval(() => {
              this._Router.navigate(['/home'])
            }, 2000);
          }          
        },
        error:(err)=>{
          this.isLoading = false;
          this.loginForm.get('email')?.reset();
          this.errMsg = err.error.msg
          this._ToastrService.error(err.error.msg,'Note');
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.signInSub?.unsubscribe();
    clearInterval(this.setIntervalId);
  }
}
