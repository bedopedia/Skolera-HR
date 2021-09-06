import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';



@Injectable()
export class UserSerivce {
    constructor(
        private http: HttpClient) {

    }
    updateUser(userId:number, user:any) {
        return  this.http.put(baseUrl + 'api/users/' + userId, { user: user })

    }

    getCurrentUser(userId: number) {
        return this.http.get(baseUrl + 'api/users/' + userId);
    };

    getUserInfo(userType: string, userId:number, params = '') {
        return this.http.get(baseUrl + `api/${userType}/${userId}` + params);
    }

    getUserHeaderData(userType:string, userId:number) {
        return this.http.get(baseUrl + `api/${userType}/${userId}/header_data`);
    }
   
}
