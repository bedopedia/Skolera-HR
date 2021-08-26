import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@core/services';
import { FormGroup, NgForm } from '@angular/forms';
import { Globals } from '@core/globals';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('loginForm') loginForm: NgForm;
    invalidCredentials = false;
    sessionHeaders = {};
    isSubmitting = false;

    triedToLogin: boolean = false;
    returnUrl;
    protected aFormGroup: FormGroup;
    loginValidationForm: FormGroup;
    formSubmitted = false;
    user: any = {};
    isLoading = true;
    loginError = false;
    errorMessage;
    loginRecaptcha: boolean;
    captchaElem;
    show = false;

    constructor(
        private authenticationService: AuthenticationService,
        public globals: Globals,
        private router: Router
    ) { }

    ngOnInit() {
    }
    login() {
        this.router.navigate(['home/employees']);
        if (!this.user.password || !this.user.username || this.user.password == "" || this.user.username == "") {
            return;
        }
        // this.globals.showMessage('loading', '');
        this.formSubmitted = true;
        this.authenticationService.login(this.user.username, this.user.password).subscribe(response => {
            // this.globals.hideMessage();
            setTimeout(()=> {
                this.router.navigateByUrl(this.returnUrl);
            }, 600)
        }, error => {
            // this.globals.hideMessage();
            this.loginError = true;
            if (error.status == 401) {
                this.errorMessage = 'Invalid Username or Password';
            } else {
                this.errorMessage = 'An unexpected error happended, please try again.';
            }
            this.formSubmitted = false;
        });
      
    }

}
