import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeGroupSchedule } from '@core/models/time-groups-interface.model';
import { TranslateService } from '@ngx-translate/core';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.scss']
})
export class TimeScheduleComponent implements OnInit {
  scheduleDays: TimeGroupSchedule[];
  timeGroupId: number;
  employeeId: Number;
  isFormSubmitted: boolean;
  timeScheduleLoading: boolean = true ;
  private subscriptions: Subscription[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TimeScheduleComponent>,
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.timeGroupId = this.data.timeGroupId;
    this.employeeId = this.data.employeeId;
    this.timeScheduleLoading = this.data.timeScheduleLoading
    if (this.data.employeeTimeSchedule) {
      this.scheduleDays = this.data.employeeTimeSchedule.schedule_days;
    }
    else {
      this.scheduleDays = [
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
  
  public closeModal() {
    this.dialogRef.close();
  }

  addEmployeeTimeSchedule() {
    this.isFormSubmitted = true;
    let isValidDays: boolean[] = []

    this.scheduleDays.forEach(day => {
      if (day.is_off) {
        delete day.clock_in;
        delete day.clock_out;
      }
      if ((!day.clock_in || !day.clock_out) && !day.is_off) {
        day.invalidTime = true;
        isValidDays.push(true)
      }
    })

    if (isValidDays.includes(true)) {
      this.timeGroupService.onInvalidAllDaysTime.next(true)
      this.isFormSubmitted = false;
      return
    }

    const updateParams = {
      "time_group": {
        "employee_ids": this.data.timeGroupEmployeesIds,
        "employees_attributes": {
          "id": this.employeeId,
          "time_group_schedule_attributes": {
            id:  this.data.employeeTimeSchedule? this.data.employeeTimeSchedule.id: null,
            "schedule_days_attributes": this.scheduleDays
          }
        }
      }
    }
    this.subscriptions.push(this.timeGroupService.updateTimeGroupEmployees(this.timeGroupId, updateParams).subscribe(response => {
      this.appNotificationService.push(this.translate.instant('tr_time_schedule_for_employee_updated_ssuccessfuly'), 'success');
      this.dialogRef.close('update');
    }, error => {
      this.appNotificationService.push(error.error.name, 'error');
    }))
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe())
  }
}