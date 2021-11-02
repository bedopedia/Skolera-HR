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
    deleteTimeGroupBatch(ids: number[]){
        return this.http.post(baseUrl + `api/hr/time_groups/batch_destroy`,{'batch_ids': ids});
    }
    updateTimeGroupEmployees(timeGroupId:number,employees: any){
        return this.http.put(baseUrl + `/api/hr/time_groups/${timeGroupId}/update_employees`,employees)
    }
    updateRule(timeGroupId:number,params: any){
        return this.http.put(baseUrl + `/api/hr/time_groups/${timeGroupId}/update_rule`,params)
    }
}
