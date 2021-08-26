import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
    ) { }
    intercept(request: any, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;
        if (this.authenticationService.getSessionHeader()) {
            headers = this.authenticationService.getSessionHeader();
        } else {
            headers = {
                'Access-Control-Allow-Origin': '*',
            };
        }
        request = request.clone({
            setHeaders: {...headers, ...request.headers.headers}
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {}
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error.status);
                if (error.status === 401) {
                    // this.authenticationService.logout();
                }
                if (error.status === 0) {
                }
                if (error.status !== 0) {
                }
                return throwError(error);
            })
        );
    }
}