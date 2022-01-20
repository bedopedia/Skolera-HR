import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class TimeGroupsSerivce {
    onInvalidAllDaysTime: Subject<boolean> = new Subject<boolean>();
    constructor(
        private http: HttpClient) {

    }
    getLeaveTypes() {
        return this.http.get(baseUrl + `api/hr/leave_types`);
    } 
    getTimeGroups(params:any){
        return this.http.get(baseUrl + `api/hr/time_groups`,{params: params});
    }
    createTimeGroup(params:any){
        return this.http.post(baseUrl + `api/hr/time_groups`,params);
    }
    showTimeGroup(id:number){
        return this.http.get(baseUrl + `api/hr/time_groups/${id}`);
    }
    editTimeGroup(id:number, params:any){
        return this.http.put(baseUrl + `api/hr/time_groups/${id}`,params);
    }
    deleteTimeGroup(id: number){
        return this.http.delete(baseUrl + `api/hr/time_groups/${id}`);
    }
    updateTimeGroupEmployees(timeGroupId:number,employees: any){
        return this.http.put(baseUrl + `/api/hr/time_groups/${timeGroupId}/update_employees`,employees)
    }
}
