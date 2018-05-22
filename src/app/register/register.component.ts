import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private _flashMessagesService: FlashMessagesService) { }

    firstname = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

    lastname = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

    email = new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    Validators.pattern('^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.[a-zA-Z0–9-.]+$')]);

    password = new FormControl('', [Validators.required,
    Validators.minLength(3)]);

    cpassword = new FormControl('', [Validators.required,
    Validators.minLength(3)]);

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            cpassword: this.cpassword
        });
    }

    register() {
        console.log("= register ===============")
        console.log(this.registerForm.value);
        console.log("= register ===============")

        this.userService.register(this.registerForm.value).subscribe(
            res => {
                console.log(res);
                this.router.navigate(['/login']);
                this._flashMessagesService.show('you successfully registered!', { cssClass: 'alert-success', timeout: 3000 });
                this._flashMessagesService.grayOut(true); // turn on gray out feature
            },
            error => {
                console.log(error);
                this._flashMessagesService.show('email already exists!', { cssClass: 'alert-danger', timeout: 3000 });
                this._flashMessagesService.grayOut(true); // turn on gray out feature
            }
        );
    }
}