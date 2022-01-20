import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeGroup, TimeGroupSchedule } from '@core/models/time-groups-interface.model';
import { Department, Employee } from '@core/models/employees-interface.model';
import { PaginationData } from '@core/models/skolera-interfaces.model';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-time-group',
  templateUrl: './create-time-group.component.html',
  styleUrls: ['./create-time-group.component.scss']
})
export class CreateTimeGroupComponent implements OnInit {

  isFormSubmitted: boolean = false;
  timeGroupLoading: boolean = true;
  timeGroup: TimeGroup ;
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
    public dialogRef: MatDialogRef<CreateTimeGroupComponent>,
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
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

  public closeModal() {
    this.dialogRef.close();
  }

  public updatetimeGroupScheduleDays(scheduleDays: TimeGroupSchedule[]) {
    this.timeGroup.time_group_schedule_attributes!.schedule_days_attributes!= scheduleDays;
  }

  public createTimeGroup() {
    this.isFormSubmitted = true;
    if (this.timeGroup.name == '') {
      this.isFormSubmitted = false;
      return
    }
    let isValidDays: boolean[] = []
    if (this.timeGroup.group_type == 'fixed') {

      this.timeGroup.time_group_schedule_attributes!.schedule_days_attributes!.forEach(day => {
        if (day.is_off) {
          delete day.clock_in;
          delete day.clock_out;
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
    if (isValidDays.includes(true)) {
      this.isFormSubmitted = false;
      this.timeGroupService.onInvalidAllDaysTime.next(isValidDays.includes(true))
      return
    }

    this.subscriptions.push(this.timeGroupService.createTimeGroup({ time_group: this.timeGroup }).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_time_group_created_successfully'), 'success');
      this.dialogRef.close('update');
    }, error => {
      this.appNotificationService.push(error.error.name, 'error');
      this.isFormSubmitted = false;
    })) 
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}
