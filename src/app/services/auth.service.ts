import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isDashboard = false;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private userService: UserService,
    private router: Router) {
    const token = localStorage.getItem('token');
    console.log('================== token', token)
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      console.log('=============decodedUser ', decodedUser);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    console.log('======== 17 =============', emailAndPassword);
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        console.log('=============== 28 ==============', res)
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isDashboard = false;
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.isDashboard=true;
  }
}
