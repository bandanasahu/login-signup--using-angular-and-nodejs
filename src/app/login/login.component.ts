import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    loginForm: FormGroup;

    constructor(private auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private _flashMessagesService: FlashMessagesService) { }

    email = new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)]);

    password = new FormControl('', [Validators.required,
    Validators.minLength(3)]);


    ngOnInit() {
        if (this.auth.loggedIn) {
            this.router.navigate(['/dashboard']);
        }
        this.loginForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
        });
    }

    login() {
        console.log("= login ===============")
        this.auth.login(this.loginForm.value).subscribe(
            res => {
                console.log('===== response ============', res);
                this._flashMessagesService.show('you successfully loggedin!', { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.log('========== error ============', error)
                this._flashMessagesService.show('Wrong Credentials', { cssClass: 'alert-danger', timeout: 3000 });
                this._flashMessagesService.grayOut(true); // turn on gray out feature
            }
        );
    }
}