import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department, Employee, PaginationData, TimeGroup, TimeGroupSchedule } from '@core/models/skolera-interfaces.model';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { HeaderComponent } from '../../header/header.component';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { EmployeesSerivce } from '@skolera/services/employees.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-edit-time-group',
  templateUrl: './create-edit-time-group.component.html',
  styleUrls: ['./create-edit-time-group.component.scss']
})
export class CreateEditTimeGroupComponent implements OnInit {
  isFormSubmitted: boolean = false;
  timeGroupLoading: boolean = true;
  timeGroup: TimeGroup = new TimeGroup();
  inValidAllDaysTime: boolean = false
  scheduleDaysAttributes: TimeGroupSchedule[] = [new TimeGroupSchedule()];
  private subscriptions: Subscription[] = [];


  departments: Department[] = [];
  selectedDepartment: string;
  dePartmentsParams: any = {
    page: 1,
    per_page: 10,
  };

  employessParams: any = {
    page: 1,
    per_page: 10,
  };

  employeesPaginationData: PaginationData
  departmentsPagination: PaginationData
  employeesLoading: boolean = true;
  departmentsLoading: boolean = true;
  employeesList: Employee[] = [];
  timeGroupsEmployees: Employee[] = [];
  @ViewChild('timeGroupForm') announcementForm: NgForm;

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private TimeGroupsSerivce: TimeGroupsSerivce,
    private employeesService: EmployeesSerivce
  ) { }

  ngOnInit(): void {
    if (this.data.action == 'create') {
      this.timeGroupLoading = false
      this.timeGroup = {
        name: '',
        group_type: 'fixed',
        time_group_schedule_attributes: {
          schedule_days_attributes: [
            {
              day: 'sunday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }, {
              day: 'monday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }, {
              day: 'tuesday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }, {
              day: 'wednesday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }, {
              day: 'thursday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }, {
              day: 'friday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }, {
              day: 'saturday',
              clock_in: '',
              clock_out: '',
              is_off: false,
              calculate_bridging: false,
            }
          ]
        }

      }
    }
    else {
      this.getTimeGroup(this.data.timeGroup.id)
    }
    this.getEmployees();
    this.getDepartments();
  }

  public closeModal() {
    this.dialogRef.close();
  }

  private getTimeGroup(id: number) {
    this.TimeGroupsSerivce.showTimeGroup(id).subscribe((response: any) => {
      this.timeGroup = response
      response.time_group_schedule.schedule_days_attributes = response.time_group_schedule.schedule_days ;
      this.timeGroup.time_group_schedule_attributes  = response.time_group_schedule;
      delete this.timeGroup.time_group_schedule_attributes?.schedule_days;
      delete this.timeGroup.time_group_schedule;
      this.timeGroupLoading = false;
    })

  }
  public validateClockInOut(day: any) {
    if (day.clock_in == '' || day.clock_out == '') {
      return
    }
    let clockIn = moment(day.clock_in, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    let clockOut = moment(day.clock_out, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    day.invalidTime = (clockIn > clockOut) ? true : false;
    this.inValidAllDaysTime = this.timeGroup.time_group_schedule_attributes!.schedule_days_attributes!.filter(day => day.invalidTime).length > 0
  }

  public createTimeGroup() {
    this.isFormSubmitted = true;
    let isValidDays: boolean[] = []
    if (this.timeGroup.group_type == 'fixed') {

      this.timeGroup.time_group_schedule_attributes!.schedule_days_attributes!.forEach(day => {
        if (day.is_off) {
          delete day.clock_in;
          delete day.clock_out;
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

    if (this.data.action == 'create') {
      this.timeGroupService.createTimeGroup({ time_group: this.timeGroup }).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_created_successfully'), 'success');
        this.dialogRef.close('update');
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
      })
    }
    else {
      this.timeGroupService.editTimeGroup(this.data.timeGroup.id, { time_group: this.timeGroup }).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_updated_successfully'), 'success');
        this.dialogRef.close('update');
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
      })
    }

  }


  getDepartments() {
    this.departmentsLoading = true
    this.employeesService.getDepartments(this.dePartmentsParams).subscribe((response: any) => {
      this.departmentsPagination = response.meta;
      this.departments = this.departments.concat(response.employee_departments);
      this.departmentsLoading = false
    })
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
  assignEmployeeIngroup(event: any, timeGroupEmployee: Employee) {
    console.log("ecent", event, timeGroupEmployee);
    if (event.target.checked) {
      this.timeGroupsEmployees.push(timeGroupEmployee)
    }
    else {
      this.timeGroupsEmployees = this.timeGroupsEmployees.filter(employee => employee.name != timeGroupEmployee.name)
    }


  }

  filterEmployees(term: any, serchKey: string) {
    term = (serchKey == 'by_department_name') ? term : term.target.value
    if (term.trim() === serchKey) {
      delete this.employessParams[serchKey];
    }
    else {
      this.employessParams[serchKey] = term;
    }
    this.getEmployees();
  }

  removeEmployeeFromGroup(timegroupEmployee: Employee) {
    console.log("timegroupEmployee", timegroupEmployee);

  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
}
}
