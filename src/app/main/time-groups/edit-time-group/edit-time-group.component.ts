import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeGroup, TimeGroupSchedule } from '@core/models/time-groups-interface.model';
import { Department, Employee } from '@core/models/employees-interface.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SkoleraConfirmationComponent } from '@shared/components/skolera-confirmation/skolera-confirmation.component';
import { TimeScheduleComponent } from '../time-schedule/time-schedule.component';
import { Rule } from '@core/models/rules-interfaces.model';
import { RulesSerivce } from '@skolera/services/rules.services';

@Component({
  selector: 'app-edit-time-group',
  templateUrl: './edit-time-group.component.html',
  styleUrls: ['./edit-time-group.component.scss']
})
export class EditTimeGroupComponent implements OnInit {
  isFormSubmitted: boolean = false;
  timeGroupLoading: boolean = true;
  timeGroup: TimeGroup;
  invalidAllDaysTime: boolean = false
  scheduleDaysAttributes: TimeGroupSchedule[] = [new TimeGroupSchedule()];
  private subscriptions: Subscription[] = [];
  timeGroupId: number


  departments: Department[] = [];
  selectedDepartment: string;
  dePartmentsParams: any = {
    page: 1,
    per_page: 10,
  };
  employessParams: any = {
    page: 1,
    per_page: 10
  };
  rulesParams: any = {
    page: 1,
    per_page: 10,
  }

  employeesPaginationData: PaginationData
  departmentsPagination: PaginationData
  rulesPagination: PaginationData
  employeesLoading: boolean = true;
  departmentsLoading: boolean = true;
  employeesList: Employee[] = [];
  timeGroupEmployees: any
  processType: string = 'create';
  rulesLoading: boolean = true;
  rules: Rule[] = []
  currentTimeGroup: string;
  selectedNumber: string;
  selectedName: string;
  @ViewChild('timeGroupForm') announcementForm: NgForm;
  filteredTimeGroupEmployees: Employee[];

  constructor(
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService,
    private TimeGroupsSerivce: TimeGroupsSerivce,
    private employeesService: EmployeesSerivce,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private rulesSerivce: RulesSerivce

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.timeGroupId = params.id
    })
    this.getTimeGroup(this.timeGroupId);
    this.getRules();
    this.getDepartments();
   
    
  }


  private getTimeGroup(id: number) {
    this.TimeGroupsSerivce.showTimeGroup(id).subscribe((response: any) => {
      this.timeGroup = response;
      this.currentTimeGroup = this.timeGroup.name
      this.filteredTimeGroupEmployees = this.timeGroup.employees || []
      this.getEmployees();
      this.timeGroupEmployees = JSON.parse(JSON.stringify(this.timeGroup.employees))
      if (this.timeGroup.group_type == 'fixed') {
        response.time_group_schedule.schedule_days_attributes = response.time_group_schedule.schedule_days;
        this.timeGroup.time_group_schedule_attributes = response.time_group_schedule;
        delete this.timeGroup.time_group_schedule_attributes?.schedule_days;
        delete this.timeGroup.time_group_schedule;
      }
      this.timeGroupLoading = false;

    }, error=> {
      this.appNotificationService.push( this.translate.instant('tr_unexpected_error_message'), 'error');
     })
  }

  public openTimeScheduleModal(employee: Employee) {
    let dialogRef = this.dialog.open(TimeScheduleComponent, {
      width: '750px',
      disableClose: true,
      data: {
        employeeId: employee.id!,
        timeGroupId: this.timeGroupId,
        employeeTimeSchedule: employee.time_group_schedule!,
        timeScheduleLoading: false,
        timeGroupEmployeesIds: this.timeGroup.employees?.map(employee => { return employee.id })
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') {
        this.getTimeGroup(this.timeGroupId);
      }
    })
  }

  public updatetimeGroupScheduleDays(scheduleDays: TimeGroupSchedule[]) {
    this.timeGroup.time_group_schedule_attributes!.schedule_days_attributes != scheduleDays;
  }

  public updateTimeGroup() {
    this.isFormSubmitted = true;
    let isValidDays: boolean[] = []
    if (this.timeGroup.group_type == 'fixed') {
      this.timeGroup.time_group_schedule_attributes!.schedule_days_attributes!.forEach(day => {
        if (day.is_off) {
          day.clock_in = null;
          day.clock_out = null;
        }

        if ((day.clock_in == '' || day.clock_out == '') && !day.is_off) {
          day.invalidTime = true;
          isValidDays.push(true)
        }
      })

    }
    else {
      delete this.timeGroup.time_group_schedule_attributes
    }

    if (this.timeGroup.name == '' || isValidDays.includes(true)) {
      this.isFormSubmitted = false;
      this.invalidAllDaysTime = isValidDays.includes(true)
      return
    }
    this.timeGroup.rule_id = this.timeGroup.rule?.id
    this.timeGroupService.editTimeGroup(this.timeGroupId, { time_group: this.timeGroup }).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_time_group_updated_successfully'), 'success');
      this.isFormSubmitted = false;
    }, error => {
      this.appNotificationService.push(error.error.name, 'error');
      this.isFormSubmitted = false;
    })
  }

  public getDepartments() {
    this.departmentsLoading = true
    this.subscriptions.push(this.employeesService.getDepartments(this.dePartmentsParams).subscribe((response: any) => {
      this.departmentsPagination = response.meta;
      this.departments = this.departments.concat(response.employee_departments);
      this.departmentsLoading = false
    }, error=> {
      this.appNotificationService.push( this.translate.instant('tr_unexpected_error_message'), 'error');
     }))
  }
  public getRules() {
    this.rulesLoading = true;
    this.subscriptions.push(this.rulesSerivce.getRules(this.rulesParams).subscribe((response: any) => {
      this.rules = response.rules;
      this.rulesPagination = response.meta;
      this.rulesLoading = false;

    }))
  }
  public nextRulesBatch() {
    if (this.rulesPagination.next_page) {
      this.rulesLoading = true;
      this.rulesParams.page = this.departmentsPagination.next_page;
      this.getRules();
    }
  }

  public nextBatch() {
    if (this.departmentsPagination.next_page) {
      this.departmentsLoading = true;
      this.dePartmentsParams.page = this.departmentsPagination.next_page;
      this.getDepartments();
    }
  }
  public nextpage() {
    let nextPage = this.employeesPaginationData.next_page;
    this.employessParams.page = nextPage;
    if (nextPage) {
      this.getEmployees()
    }
  }

  public getEmployees(type?: string) {
    if (type == "search") {
      this.employeesList = []
    }
    this.employeesLoading = true;
    this.employeesService.getEmployees(this.employessParams).subscribe((response: any) => {
      this.employeesList = this.employeesList.concat(response.employees)
      this.employeesList.forEach(employee => {
        employee.isInsideCurrentTimeGroup = employee.time_group?.name === this.currentTimeGroup  ? true : false
        if(this.timeGroup.employees && this.timeGroup.employees.length > 0){
            employee.isInsideCurrentTimeGroup = this.timeGroup.employees.find(time_group_employee => time_group_employee.id == employee.id) ? true : false
        }
      })
      this.employeesPaginationData = response.meta;
      this.employeesLoading = false
    }, error=> {
      this.appNotificationService.push( this.translate.instant('tr_unexpected_error_message'), 'error');
     })
  }

  public updateTimeGroupEmployees() {
    const updateParams = {
      'time_group': {
        "employee_ids": this.timeGroup.employees?.map(employee => { return employee.id }),
      }
    }
    this.subscriptions.push(
      this.timeGroupService.updateTimeGroupEmployees(this.timeGroupId, updateParams).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_employees_updated_successfully'), 'success');
        this.employeesList = []
        this.getEmployees()
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
        this.isFormSubmitted = false;
      }))
  }
  checkIsInsideCurrentTimeGroup(employee: Employee) {
    return employee.isInsideCurrentTimeGroup
  }
  public assignEmployeeIngroup(event: any, timegroupEmployee: Employee) {

    if (event.target.checked) {
      if (timegroupEmployee.time_group && timegroupEmployee.time_group.id != this.timeGroup.id) {
        let data = {
          title: this.translate.instant("tr_unassign_message"),
          buttons: [
            {
              label: this.translate.instant("tr_action.cancel"),
              actionCallback: 'cancel',
              type: 'btn-secondary'
            },
            {
              label: this.translate.instant("tr_action.ok"),
              actionCallback: 'ok',
              type: 'btn-primary'
            }
          ]
        }
        const dialogRef = this.dialog.open(SkoleraConfirmationComponent, {
          width: '400px',
          data: data,
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == 'ok') {
            let params = {
              "employee": {
                "time_group_id": null
              }
            }
            this.subscriptions.push(this.employeesService.updateEmployee(timegroupEmployee.id, params).subscribe((response: any) => {
              this.appNotificationService.push(this.translate.instant('tr_unassign_time_group_successfully'), 'success');
              timegroupEmployee.isInsideCurrentTimeGroup = true
              this.timeGroup.employees?.push(timegroupEmployee)
              this.filterTimeGroupEmployees()
              this.employeesList = [];
              this.getEmployees();
            }, error => {
              this.appNotificationService.push('There was an unexpected error, please reload', 'error');
              timegroupEmployee.isInsideCurrentTimeGroup = false
              event.target.checked = false
            }))

          }
          else {
            timegroupEmployee.isInsideCurrentTimeGroup = false;
            event.target.checked = false
            
          }
        })
      }
      else {
        timegroupEmployee.isInsideCurrentTimeGroup = true;
        this.timeGroup.employees?.push(timegroupEmployee)
      }

    }
    else {
      timegroupEmployee.isInsideCurrentTimeGroup = false
      this.timeGroup.employees = this.timeGroup.employees!.filter(employee => employee.name != timegroupEmployee.name)
      this.filteredTimeGroupEmployees = this.filteredTimeGroupEmployees!.filter(employee => employee.name != timegroupEmployee.name)
    }
    this.timeGroupEmployees = JSON.parse(JSON.stringify(this.timeGroup.employees))
  }

  public filterEmployees(term: any, searchKey: string) {

    if(!term || (searchKey != 'by_department_id' && (term == '' || term.target.value == ''))){
      delete this.employessParams[searchKey]
    }else{
      const searchTerm = (searchKey == 'by_department_id') ? term.id : term.target.value
      this.employessParams[searchKey] = searchTerm;
    }
    this.employeesList = [];
    this.getEmployees('search');
    this.filterTimeGroupEmployees()
  }
    
    filterTimeGroupEmployees(){
    var filteredEmployees: Employee[] = this.timeGroup.employees || []
    if(this.employessParams['by_name']){
      filteredEmployees = filteredEmployees!.filter(employee => employee.name.toLowerCase().includes(this.employessParams['by_name'].toLowerCase()))
    }
    if(this.employessParams['by_number']){
      filteredEmployees = filteredEmployees!.filter(employee => employee.number.toLowerCase().includes(this.employessParams['by_number']))
    }
    if(this.employessParams['by_department_id']){
      const departmentName = this.departments.find(department => department.id == this.employessParams['by_department_id'])!.name
      filteredEmployees = filteredEmployees!.filter(employee => employee.department_name == departmentName)
    }
    this.filteredTimeGroupEmployees = filteredEmployees
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}
