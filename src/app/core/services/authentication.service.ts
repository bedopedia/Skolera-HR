
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
import { Globals } from '@core/globals';

@Injectable()
export class AuthenticationService {

    currentUser;
    sessionHeaders;
    constructor(
        private http: HttpClient,
        private router: Router,
        public globals: Globals
    ) { }

    login(email: string, password: string) {
        return this.http.post(`${baseUrl}/api/auth/sign_in`,
            {
                "email": email,
                "password": password
            }, { observe: 'response' })
    }
    logout() {
        localStorage.clear();
        this.setCurrentUser();
        this.router.navigate(['login']);
    }
    resetHeaders() {
        this.sessionHeaders = {
            'Access-Control-Allow-Origin': '*',
        };
        localStorage.setItem('sessionHeaders', JSON.stringify(this.sessionHeaders));
    }
    setCurrentUser() {
        this.globals.currentUser = this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    getSessionHeader() {
        return JSON.parse(localStorage.getItem('sessionHeaders'));
    }
}
