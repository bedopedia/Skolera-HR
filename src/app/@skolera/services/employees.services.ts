import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';


@Injectable()
export class EmployeesSerivce {
    constructor(
        private http: HttpClient) {

    }
    getEmployees(params:any) {
        return this.http.get(baseUrl + `api/hr/employees`,{ params: params });
    }
    getDepartments(params: any){
        return this.http.get(baseUrl + `api/hr/employee_departments`,{ params: params });
    }
   
}
