import {finalize, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Globals } from '../globals';

const httpOptions = {
    headers: new HttpHeaders({
        'access-token': '',
        'client': '',
        'uid': ''
    })
};


@Injectable()
export class AuthenticationService {

    currentUser;
    sessionHeaders:any;

    constructor(
        private http: HttpClient,
        private globals: Globals,
        private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.globals.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    login(username: string, password: string) {
        return this.http.post<any>(baseUrl + "api/auth/sign_in",
            {
                username: username,
                password: password,
                mobile: 'true',
                hr_module: true
            },
            {
                observe: 'response'
            }).pipe(map((response: any) => {
                if (response) {
                    this.currentUser = response.body.data;
                    this.sessionHeaders['access-token'] = response.headers.get('access-token');
                    this.sessionHeaders['client'] = response.headers.get('client');
                    this.sessionHeaders['uid'] = response.headers.get('uid');
                    this.globals.currentUser = response.body.data;
                    this.globals.sessionHeaders = this.sessionHeaders;
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    localStorage.setItem('sessionHeaders', JSON.stringify(this.sessionHeaders));
                    return response;
                }
                })
        );
    }


    logout() {
        if (this.getCurrentUser()) {
            const notificationToken = JSON.parse(localStorage.getItem('fcmToken') || '{}');
            this.http.delete(`${baseUrl}api/auth/sign_out`, { params: { fcm_token: notificationToken } })
              .pipe(finalize(() => {
                localStorage.clear();
                // this.dialog.closeAll();
                this.router.navigate(['login']);
                })
            ).subscribe();
        }
    }

    resetHeaders() {
        this.sessionHeaders = {
            'Access-Control-Allow-Origin': '*'
        };
        localStorage.setItem('sessionHeaders', JSON.stringify(this.sessionHeaders));
    }
    getCurrentUser() {
        const currentUser = localStorage.getItem('currentUser')
        if (currentUser) {
            return JSON.parse(currentUser);
        }
    }

    getSessionHeader() {
        const headers = JSON.parse(localStorage.getItem('sessionHeaders') || '{}');
        if (!headers) { return; }
        if (!headers['access-token']) { return null; }
        return headers;
    }
}
