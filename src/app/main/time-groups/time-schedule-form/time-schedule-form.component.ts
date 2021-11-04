import { Component, Input, OnInit, Output } from '@angular/core';
import { TimeGroupSchedule } from '@core/models/time-groups-interface.model';
import * as moment from 'moment';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-schedule-form',
  templateUrl: './time-schedule-form.component.html',
  styleUrls: ['./time-schedule-form.component.scss']
})
export class TimeScheduleFormComponent implements OnInit {
  @Input() invalidAllDaysTime: boolean = false;
  @Input() scheduleDays: TimeGroupSchedule [];
  @Input() timeScheduleLoading: boolean = true;
  @Output() returnedScheduleDays: EventEmitter<TimeGroupSchedule []> = new EventEmitter<TimeGroupSchedule []>();
  constructor() { }

  ngOnInit(): void {
  }
  
  public validateClockInOut(day: any) {
    if (day.clock_in == '' || day.clock_out == '') {
      return
    }
    let clockIn = moment(day.clock_in, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    let clockOut = moment(day.clock_out, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    day.invalidTime = (clockIn > clockOut) ? true : false;
    this.invalidAllDaysTime = this.scheduleDays.filter(day => (day.invalidTime && !day.is_off)).length > 0;
    this.returnedScheduleDays.emit(this.scheduleDays);
  }
  
}