import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/services';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { siteKey } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '@core/globals';

@Component({
    selector: 'login-components',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    siteKey = siteKey;
    // 
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
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private zone: NgZone,
        private translate: TranslateService,
        public globals: Globals
    ) {
        document.querySelector('body').setAttribute('dir', 'ltr');
    }

    ngOnInit() {
        this.authenticationService.resetHeaders();
        this.aFormGroup = this.formBuilder.group({
            recaptcha: ['', Validators.required]
        });
        if (this.authenticationService.getCurrentUser()) {
            this.router.navigate(['home']);
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    }

    onSubmit() {
        if (!this.user.password || !this.user.username || this.user.password == "" || this.user.username == "") {
            return;
        }
        // if (!this.loginRecaptcha) {
        //     this.globals.showMessage('loading', 'Please wait. We are verifying you are not a robot...')
        //     this.captchaElem.reCaptchaApi.execute()
        //     return;
        // }
        this.globals.showMessage('loading', '');
        this.formSubmitted = true;
        this.authenticationService.login(this.user.username, this.user.password).subscribe(response => {
            this.globals.hideMessage();
            setTimeout(()=> {
                this.router.navigateByUrl(this.returnUrl);
            }, 600)
        }, error => {
            this.globals.hideMessage();
            this.loginError = true;
            if (error.status == 401) {
                this.errorMessage = 'Invalid Username or Password';
            } else {
                this.errorMessage = 'An unexpected error happended, please try again.';
            }
            this.formSubmitted = false;
        });

    }
    invisibleLoad() {
    }
    invisibleReady(captchaElem) {
        this.captchaElem = captchaElem;
    }
    invisibleSuccess(event) {
        this.loginRecaptcha = true;
        this.onSubmit();
    }
    invisibleReset() {

    }
}
