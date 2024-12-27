import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

export const routes: Routes = [
    { path: "home", component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: '**', component: LoginComponent }
];
