import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable()
export class RulesSerivce {
    constructor(
        private http: HttpClient) {

    }
    getRules(params:any) {
        return this.http.get(baseUrl + `api/hr/rules`,{ params: params });
    }
    getRule(ruleId: number){
        return this.http.get(baseUrl + `api/hr/rules/${ruleId}`);
    }
    createRule(params:any){
        return this.http.post(baseUrl + `api/hr/rules`,params);
    }
    updateRule(params:any, ruleId: number){
        return this.http.put(baseUrl + `api/hr/rules/${ruleId}`,params);
    }
    getLeaveTypes(){
        return  this.http.get(baseUrl + `api/hr/leave_types`);
    }
    deleteRule(ruleId: number){
        return  this.http.delete(baseUrl + `api/hr/rules/${ruleId}`);
    }
}