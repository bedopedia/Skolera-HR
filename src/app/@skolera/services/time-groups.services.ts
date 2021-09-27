import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';



@Injectable()
export class TimeGroupsSerivce {
    constructor(
        private http: HttpClient) {

    }
    getLeaveTypes() {
        return this.http.get(baseUrl + `api/hr/leave_types`);
    } 
    getTimeGroups(params:any){
        return this.http.get(baseUrl + `api/hr/time_groups`,{params: params});
    }
}
