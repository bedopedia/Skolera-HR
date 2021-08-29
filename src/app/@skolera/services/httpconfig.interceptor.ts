import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError, of, EMPTY } from 'rxjs';
import { map, catchError, retry, tap, retryWhen, delay, take, mergeMap } from 'rxjs/operators';
import { Globals } from '@core/globals';
import { AuthenticationService } from '@core/services';
import { Router } from '@angular/router';
import { AppNotificationService } from '@shared/services';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private globals: Globals,
        private router: Router,
        private appNotificationService: AppNotificationService,
        private translate: TranslateService
    ) { }
    returnUrl;
    intercept(request: any, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;
        if (this.globals.sessionHeaders) {
            headers = this.globals.sessionHeaders;
        } else {
            headers = {
                'Access-Control-Allow-Origin': '*'
            };
        }
        request = request.clone({
            setHeaders: { ...headers, ...request.headers.headers }
        });
            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if(event.status === 200)
                        this.globals.systemAlerts.noConnection = false;
                        if (event.headers.has('timezone')) {
                            this.globals.timezone = event.headers.get('timezone');
                            localStorage.setItem('timezone', JSON.stringify(event.headers.get('timezone')));
                        }
                    }
                    return event;
                }),
        
            catchError((error: HttpErrorResponse) => {
                console.log("error.status",error.status,error);
                const chunkFailedMessage = /Loading chunk [\d]+ failed/;
                if (chunkFailedMessage.test(error.message)) {
                  this.globals.systemAlerts.newVersion = true;
                }
                if (error.status === 401) {
                    this.authenticationService.logout();
                }
                if (error.status === 403) {
                    this.globals.showNoPermissionAlert();
                }
                if (error.status === 406) {
                  this.returnUrl = this.returnUrl ? this.returnUrl : this.router.url;
                  this.router.navigate(['update-password'], { queryParams: { returnUrl: this.returnUrl } });
                  return EMPTY;

                }
                if (error.status !== 0) {
                    this.globals.systemAlerts.noConnection = false;
                }
                return throwError(error);
            })
        );
    }
}
