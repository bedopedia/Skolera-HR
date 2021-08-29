import { Injectable } from '@angular/core';
import { baseUrl } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(
        private http: HttpClient,
    ) { }
    getNotifications(userId, params) {
        return this.http.get(baseUrl + 'api/users/' + userId + '/notifications', {params: params});
    }
}
