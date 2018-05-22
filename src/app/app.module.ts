import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardDashboard } from './services/auth-guard-dashboard.service';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    FlashMessagesModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardLogin,
    AuthGuardDashboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


