import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UploadService } from './upload.service';

@Injectable()
export class UserSerivce {
    constructor(
        private http: HttpClient,
        private uploadService: UploadService) {

    }

    getCurrentUser(userId) {
        return this.http.get(baseUrl + 'api/users/' + userId);
    };
    updateUser(userId, user) {
        return this.uploadService.upload('PUT', baseUrl + `api/users/${userId}`, { user: user });
    }

    
}
