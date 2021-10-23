import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department, Employee, PaginationData, TimeGroup, TimeGroupSchedule } from '@core/models/skolera-interfaces.model';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { HeaderComponent } from '../../header/header.component';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SkoleraConfirmationComponent } from '@shared/components/skolera-confirmation/skolera-confirmation.component';
import { TimeScheduleComponent } from '../time-schedule/time-schedule.component';

@Component({
  selector: 'app-edit-time-group',
  templateUrl: './edit-time-group.component.html',
  styleUrls: ['./edit-time-group.component.scss']
})
export class EditTimeGroupComponent implements OnInit {
  isFormSubmitted: boolean = false;
  timeGroupLoading: boolean = true;
  timeGroup: TimeGroup;
  inValidAllDaysTime: boolean = false
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
    per_page: 10,
    unassigned: true
  };

  employeesPaginationData: PaginationData
  departmentsPagination: PaginationData
  employeesLoading: boolean = true;
  departmentsLoading: boolean = true;
  employeesList: Employee[] = [];
  timeGroupEmployees: any
  processType: string = 'create';
  @ViewChild('timeGroupForm') announcementForm: NgForm;

  constructor(
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService,
    private TimeGroupsSerivce: TimeGroupsSerivce,
    private employeesService: EmployeesSerivce,
    private route: ActivatedRoute,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.timeGroupId = params.id
    })

    this.getEmployees();
    this.getDepartments();
    this.getTimeGroup(this.timeGroupId);
  }


  private getTimeGroup(id: number) {
    this.TimeGroupsSerivce.showTimeGroup(id).subscribe((response: any) => {
      this.timeGroup = response
      if (this.timeGroup.group_type == 'fixed') {
        response.time_group_schedule.schedule_days_attributes = response.time_group_schedule.schedule_days;
        this.timeGroup.time_group_schedule_attributes = response.time_group_schedule;
        delete this.timeGroup.time_group_schedule_attributes?.schedule_days;
        delete this.timeGroup.time_group_schedule;
      }
      this.timeGroupLoading = false;

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
        timeScheduleLoading: false }
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
      this.inValidAllDaysTime = isValidDays.includes(true)
      return
    }

    this.updateTimeGroupEmployees()
    this.timeGroupService.editTimeGroup(this.timeGroupId, { time_group: this.timeGroup }).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_time_group_updated_successfully'), 'success');
      this.isFormSubmitted = false;
    }, error => {
      this.appNotificationService.push(error.error.name, 'error');
      this.isFormSubmitted = false;
    })
  }

  getDepartments() {
    this.departmentsLoading = true
    this.subscriptions.push(this.employeesService.getDepartments(this.dePartmentsParams).subscribe((response: any) => {
      this.departmentsPagination = response.meta;
      this.departments = this.departments.concat(response.employee_departments);
      this.departmentsLoading = false
    }))
  }



  nextBatch() {
    if (this.departmentsPagination.next_page) {
      this.departmentsLoading = true;
      this.dePartmentsParams.page = this.departmentsPagination.next_page;
      this.getDepartments();
    }
  }
  nextpage() {
    let nextPage = this.employeesPaginationData.next_page;
    this.employessParams.page = nextPage;
    if (nextPage) {
      this.getEmployees()
    }
  }

  getEmployees() {
    this.employeesLoading = true;
    this.employeesService.getEmployees(this.employessParams).subscribe((response: any) => {
      this.employeesList = this.employeesList.concat(response.employees)
      this.employeesPaginationData = response.meta;
      this.employeesLoading = false
    })
  }
  updateTimeGroupEmployees() {
    let updateParams = {
      'time_group': {
        "employee_ids": this.timeGroup.employees?.map(employee => { return employee.id }),
      }
    }
    this.subscriptions.push(
      this.timeGroupService.updateTimeGroupEmployees(this.timeGroupId, updateParams).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_employees_updated_successfully'), 'success');
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
        this.isFormSubmitted = false;
      }))
  }
  assignEmployeeIngroup(event: any, timegroupEmployee: Employee) {
    if (event.target.checked) {
      this.timeGroup.employees?.push(timegroupEmployee)
    }
    else {
      this.timeGroup.employees = this.timeGroup.employees!.filter(employee => employee.name != timegroupEmployee.name)
    }
  }

  filterEmployees(term: any, serchKey: string) {
    term = (serchKey == 'by_department_id') ? term : term.target.value
    this.employessParams[serchKey] = term;
    this.employeesList = [];
    this.getEmployees();
  }

  removeEmployeeFromGroup(timegroupEmployee: Employee) {
    let data = {
      title: this.translate.instant("tr_delete_employee_confirmation_message"),
      buttons: [
        {
          label: this.translate.instant("tr_action.cancel"),
          actionCallback: 'cancel',
          type: 'btn-secondary'
        },
        {
          label: this.translate.instant("tr_action.delete"),
          actionCallback: 'delete',
          type: 'btn-danger'
        }
      ]
    }

    const dialogRef = this.dialog.open(SkoleraConfirmationComponent, {
      width: '450px',
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.timeGroup.employees = this.timeGroup.employees!.filter(employee => employee.name != timegroupEmployee.name);
        this.updateTimeGroupEmployees()
        this.getEmployees()
      }
    })

  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}
