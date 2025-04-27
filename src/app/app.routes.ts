import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[loginGuard],children:[

        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},

    ]},
    {path:'',component:MainLayoutComponent,canActivate:[authGuard],children:[

        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'**',component:NotfoundComponent}
        
    ]}
];
