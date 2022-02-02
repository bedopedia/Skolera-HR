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
  scheduleDaysAttributes: TimeGroupSchedule[] = [new TimeGroupSchedule()];
  private subscriptions: Subscription[] = [];
  timeGroupId: number


  departments: Department[] = [];
  selectedDepartment: string;
  dePartmentsParams: any = {
    page: 1,
    per_page: 10,
  };
  employeesParams: any = {
    include_time_group: true,
    page: 1,
    per_page: 10
  };
  timeGroupEmployeesParams: any = {
    page: 1,
    per_page: 10
  };
  rulesParams: any = {
    page: 1,
    per_page: 10,
  }

  employeesPaginationData: PaginationData;
  departmentsPagination: PaginationData;
  assignedEmployeesPaginationData: PaginationData;
  rulesPagination: PaginationData
  paginationPerPage = 10;
  employeesLoading: boolean = true;
  departmentsLoading: boolean = true;
  employeesList: Employee[] = [];
  timeGroupEmployees: any
  processType: string = 'create';
  rulesLoading: boolean = true;
  rules: Rule[] = []
  @ViewChild('timeGroupForm') announcementForm: NgForm;
  filteredTimeGroupEmployees: Employee[];
  searchTimeOut: any;
  addedEmployees: Employee[] = [];
  removedEmployees: Employee[] = [];
  timeGroupEmployeesLoading: boolean = true;

  constructor(
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService,
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
    this.timeGroupService.showTimeGroup(id).subscribe((response: any) => {
      this.timeGroup = response.time_group;
      this.assignedEmployeesPaginationData = response.meta;
      this.filteredTimeGroupEmployees = this.timeGroup.employees || []
      this.getEmployees();
      this.timeGroupEmployees = JSON.parse(JSON.stringify(this.timeGroup.employees))
      if (this.timeGroup.group_type == 'fixed') {
        response.time_group.time_group_schedule.schedule_days_attributes = response.time_group.time_group_schedule.schedule_days;
        this.timeGroup.time_group_schedule_attributes = response.time_group.time_group_schedule;
        delete this.timeGroup.time_group_schedule_attributes?.schedule_days;
        delete this.timeGroup.time_group_schedule;
      }
      this.timeGroupLoading = false;
      this.timeGroupEmployeesLoading = false

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
      if (result.message == 'update') {
        employee.time_group_schedule = result.response.time_group_schedule
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

        if ((!day.clock_in  || !day.clock_out ) && !day.is_off) {
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
      this.timeGroupService.onInvalidAllDaysTime.next(isValidDays.includes(true))
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
      this.rules = this.rules.concat(response.rules);
      this.rulesPagination = response.meta;
      this.rulesLoading = false;
    }))
  }
  public nextRulesBatch() {
    if (this.rulesPagination.next_page) {
      this.rulesLoading = true;
      this.rulesParams.page = this.rulesPagination.next_page;
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

  paginationUpdateEmployees(page: number) {
    this.employeesParams.page = page;
    this.getEmployees();
  }
  paginationUpdateAssignedEmployees(page: number)
  {
    this.timeGroupEmployeesParams.page = page;
    this.getTimeGroupEmployees() 
  }

  public getEmployees() {
   
    this.employeesLoading = true;
    this.employeesService.getEmployees(this.employeesParams).subscribe((response: any) => {
      this.employeesList = response.employees
      this.employeesList.forEach(employee => {
        employee.isInsideCurrentTimeGroup = employee.time_group?.id == this.timeGroupId
        const addedEmployeesIds = this.addedEmployees.map(employee => employee.id)
        const removedEmployeesIds = this.removedEmployees.map(employee => employee.id)
        if(addedEmployeesIds.includes(employee.id)){
          employee.isInsideCurrentTimeGroup = true
        }
        if(removedEmployeesIds.includes(employee.id)){
          employee.isInsideCurrentTimeGroup = false
        }
      })
      this.employeesPaginationData = response.meta;
      this.employeesLoading = false
    }, error=> {
      this.appNotificationService.push( this.translate.instant('tr_unexpected_error_message'), 'error');
     })
  }

  public getTimeGroupEmployees() {
   
    this.timeGroupEmployeesLoading = true;
    this.timeGroupService.getTimeGroupEmployees(this.timeGroupId, this.timeGroupEmployeesParams).subscribe((response: any) => {
      this.filteredTimeGroupEmployees = response.employees
      this.assignedEmployeesPaginationData = response.meta;
      this.timeGroupEmployeesLoading = false
    }, error=> {
      this.appNotificationService.push( this.translate.instant('tr_unexpected_error_message'), 'error');
     })
  }

  public checkEmployeesAssignedToAnotherTimeGroup(){

    const assignedEmployees = this.addedEmployees.filter(employee => employee.time_group && employee.time_group.id && employee.time_group.id != this.timeGroupId)
    if(assignedEmployees.length > 0){
      const dialogRef = this.dialog.open(SkoleraConfirmationComponent, {
        width: '400px',
        data: this.unassignEmployeesDialogData(),
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'ok') {
          this.updateTimeGroupEmployees();
        }
      })
    }else{
      this.updateTimeGroupEmployees();
    }
  }
  public updateTimeGroupEmployees() {
    const addedEmployeesIds = this.addedEmployees.map(employee => employee.id);
    const removedEmployeesIds = this.removedEmployees.map(employee => employee.id);
    const updateParams = {
      "employees": {
        'added_employees_ids': addedEmployeesIds,
        'removed_employees_ids': removedEmployeesIds,
        'time_group_id': this.timeGroupId
      }
    }
    this.subscriptions.push(
      this.employeesService.bulkUpdateEmployeesTimeGroup(updateParams).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_employees_updated_successfully'), 'success');
        
        this.employeesList.map(employee => {
          if(addedEmployeesIds.includes(employee.id)){
            employee.time_group = this.timeGroup
            this.timeGroup.employees?.push(employee)
          } else if(removedEmployeesIds.includes(employee.id)){
            delete employee.time_group;
            this.timeGroup.employees = this.timeGroup.employees?.filter(timeGroupEmployee => timeGroupEmployee.id != employee.id)
          }
        })
        this.filteredTimeGroupEmployees = this.filteredTimeGroupEmployees.concat(this.addedEmployees)
        this.filteredTimeGroupEmployees = this.filteredTimeGroupEmployees.filter(employee => !removedEmployeesIds.includes(employee.id))
        this.addedEmployees = []
        this.removedEmployees = []
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
        this.isFormSubmitted = false;
      }))
  }
  checkIsInsideCurrentTimeGroup(employee: Employee) {
    return employee.isInsideCurrentTimeGroup
  }
  public assignEmployeeIngroup(event: any, timegroupEmployee: Employee) {
    if(timegroupEmployee.id){
      if (event.target.checked) {
        timegroupEmployee.isInsideCurrentTimeGroup = true
        this.addedEmployees.push(timegroupEmployee)
        this.removedEmployees = this.removedEmployees.filter(employee => employee.id != timegroupEmployee.id)
      } else {
        timegroupEmployee.isInsideCurrentTimeGroup = false
        this.removedEmployees.push(timegroupEmployee)
        this.addedEmployees = this.addedEmployees.filter(employee => employee.id != timegroupEmployee.id)
      }
    }
  }

  public filterEmployees(term: any, searchKey: string) {
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout(() => {
      if (!term || (searchKey != 'by_department_id' && (term == '' || term.target.value == ''))) {
        delete this.employeesParams[searchKey]
        delete this.timeGroupEmployeesParams[searchKey]
      } else {
        const searchTerm = (searchKey == 'by_department_id') ? term.id : term.target.value
        this.employeesParams[searchKey] = searchTerm;
        this.timeGroupEmployeesParams[searchKey] = searchTerm;
      }
      this.getEmployees();
      this.getTimeGroupEmployees();
    }, 1000);
  }

  unassignEmployeesDialogData(): any {
    return {
      title: this.translate.instant("tr_unassign_message"),
      buttons: [
        {
          label: this.translate.instant("tr_action.cancel"),
          actionCallback: 'cancel',
          type: 'btn-secondary'
        },
        {
          label: this.translate.instant("tr_action.yes"),
          actionCallback: 'ok',
          type: 'btn-primary'
        }
      ]
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}
