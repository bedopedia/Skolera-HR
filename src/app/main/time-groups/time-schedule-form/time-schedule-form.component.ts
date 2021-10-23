import { Component, Input, OnInit, Output } from '@angular/core';
import { TimeGroupSchedule } from '@core/models/skolera-interfaces.model';
import * as moment from 'moment';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-schedule-form',
  templateUrl: './time-schedule-form.component.html',
  styleUrls: ['./time-schedule-form.component.scss']
})
export class TimeScheduleFormComponent implements OnInit {
  @Input() inValidAllDaysTime: boolean = false;
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
    this.inValidAllDaysTime = this.scheduleDays.filter(day => (day.invalidTime && !day.is_off)).length > 0;
    this.returnedScheduleDays.emit(this.scheduleDays);
  }
  
}