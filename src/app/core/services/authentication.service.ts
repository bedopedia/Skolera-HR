import {finalize, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USER } from './../../api.config';
import { baseUrl } from './../../../environments/environment';
import { Globals } from '@core/globals';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

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
    sessionHeaders;
    message;

    constructor(
        private http: HttpClient,
        private globals: Globals,
        private router: Router,
        public dialog: MatDialog,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.globals.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string) {
        return this.http.post<any>(baseUrl + USER.LOGIN,
            {
                username: username,
                password: password,
                mobile: 'true'
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
            const notificationToken = JSON.parse(localStorage.getItem('fcmToken'));
            this.http.delete(`${baseUrl}api/auth/sign_out`, { params: { fcm_token: notificationToken } })
              .pipe(finalize(() => {
                localStorage.clear();
                this.dialog.closeAll();
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
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getSessionHeader() {
        const headers = JSON.parse(localStorage.getItem('sessionHeaders'));
        if (!headers) { return; }
        if (!headers['access-token']) { return null; }
        return headers;
    }
}
