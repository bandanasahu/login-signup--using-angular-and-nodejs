import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardDashboard } from './services/auth-guard-dashboard.service';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuardDashboard]},
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: '/notfound' },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutingModule { }