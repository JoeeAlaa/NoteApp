import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  logOut():void{
    localStorage.removeItem('noteUserToken');
    localStorage.removeItem('noteUserEmail');
    localStorage.removeItem('noteUserId');
    this._AuthService.userData.set(null);
    this._Router.navigate(['/login']);
  }
}
