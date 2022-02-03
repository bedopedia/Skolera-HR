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
   getEmployeeAttendance(params: any){
    return this.http.get(baseUrl + `api/hr/employees_attendances`,{ params: params });
   }
   createAttendanceSheet(params: any){
    return this.http.post(baseUrl + `api/hr/employees_attendances`, params);
   }
   saveUploadedFile(params:any) {
    return this.http.post(baseUrl + `api/upload_file`, params);
    }
    bulkUpdateEmployeesTimeGroup(params: any){
        return this.http.put(baseUrl + `api/hr/employees`, params);
    }
    updateEmployeeTimeSchedule(employeeId: number = 0, params: any){
        return this.http.put(baseUrl + `api/hr/employees/${employeeId}/time_group_schedule`, params);
    }
}
