import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeGroup, TimeGroupSchedule } from '@core/models/skolera-interfaces.model';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';
import { HeaderComponent } from '../../header/header.component';
import { AppNotificationService } from '@skolera/services/app-notification.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-edit-time-group',
  templateUrl: './create-edit-time-group.component.html',
  styleUrls: ['./create-edit-time-group.component.scss']
})
export class CreateEditTimeGroupComponent implements OnInit {
  isFormSubmitted:boolean = false;
  timeGroupLoading: boolean = true;
  timeGroup: TimeGroup = new TimeGroup();
  scheduleDaysAttributes: TimeGroupSchedule[] = [new TimeGroupSchedule()]


  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    private timeGroupService: TimeGroupsSerivce,
    private appNotificationService: AppNotificationService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private TimeGroupsSerivce: TimeGroupsSerivce
  ) { }

  ngOnInit(): void {
    console.log("this.data",this.data);
    
    if(this.data.action == 'create'){
      this.timeGroupLoading = false
      this.timeGroup = {
        name: '',
        group_type: 'fixed',
        time_group_schedule: {
          schedule_days: [
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
   
  }

  public closeModal() {
    this.dialogRef.close();
  }
  private getTimeGroup(id:number){
    this.TimeGroupsSerivce.showTimeGroup(id).subscribe((response: any) => {
      console.log(response);
      this.timeGroup = response;
      this.timeGroupLoading = false
    })
    
  }
  public validateClockInOut(day: any) {
    if (day.clock_in == '' || day.clock_out == '') {
      return
    }
    let clockIn = moment(day.clock_in, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    let clockOut = moment(day.clock_out, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    day.invalidTime = (clockIn > clockOut) ? true : false;
  }

  public createTimeGroup() {
    this.isFormSubmitted = true;
    let isValidDays: boolean[] = []
    this.timeGroup.time_group_schedule.schedule_days.forEach(day => {
      if (day.is_off) {
        delete day.clock_in;
        delete day.clock_out;
      }
      if ((day.clock_in == '' || day.clock_out == '') && !day.is_off) {
        day.invalidTime = true;
        isValidDays.push(true)
      }
    })
    if (this.timeGroup.name == '' || isValidDays.includes(true)) {
      return
    }

    if(this.data.action == 'create'){
      this.timeGroupService.createTimeGroup({ time_group: this.timeGroup }).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_created_successfully'), 'success');
        this.dialogRef.close();
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
      })
    }
    else{
      this.timeGroupService.editTimeGroup(this.data.timeGroup.id,{ time_group: this.timeGroup }).subscribe(response => {
        this.appNotificationService.push(this.translate.instant('tr_time_group_updated_successfully'), 'success');
        this.dialogRef.close();
      }, error => {
        this.appNotificationService.push(error.error.name, 'error');
      })
    }
  
  }

}
