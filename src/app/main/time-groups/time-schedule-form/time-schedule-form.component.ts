import { Component, Input, OnInit, Output } from '@angular/core';
import { TimeGroupSchedule } from '@core/models/time-groups-interface.model';
import * as moment from 'moment';
import { EventEmitter } from '@angular/core';
import { TimeGroupsSerivce } from '@skolera/services/time-groups.services';

@Component({
  selector: 'app-time-schedule-form',
  templateUrl: './time-schedule-form.component.html',
  styleUrls: ['./time-schedule-form.component.scss']
})
export class TimeScheduleFormComponent implements OnInit {
  invalidAllDaysTime: boolean = false;
  @Input() scheduleDays: TimeGroupSchedule [];
  @Input() timeScheduleLoading: boolean = true;
  @Output() returnedScheduleDays: EventEmitter<TimeGroupSchedule []> = new EventEmitter<TimeGroupSchedule []>();
  constructor(
    private timeGroupService: TimeGroupsSerivce
  ) { }

  ngOnInit(): void {
    this.timeGroupService.onInvalidAllDaysTime.subscribe(reveviedEntry => this.invalidAllDaysTime = reveviedEntry )
  }
  
  public validateClockInOut(day: any) {
    if (day.clock_in == '' || day.clock_out == '') {
      return
    }
    const clockIn = moment(day.clock_in, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    const clockOut = moment(day.clock_out, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
    day.invalidTime = (clockIn > clockOut) ? true : false;
    this.invalidAllDaysTime = this.scheduleDays.filter(day => (day.invalidTime && !day.is_off)).length > 0;
    this.returnedScheduleDays.emit(this.scheduleDays);
  }
  showCalculateBridge(day: TimeGroupSchedule,index: number){
    let isShowCountAsBridge;
    if(index > 0 && index < 6){
      isShowCountAsBridge = this.scheduleDays[index-1].is_off || this.scheduleDays[index+1].is_off
    }
    else {
      isShowCountAsBridge = index == 0 ?  (this.scheduleDays[index+1].is_off || this.scheduleDays[6].is_off) : (this.scheduleDays[index-1].is_off || this.scheduleDays[0].is_off);
    }
    return  (!day.is_off) && isShowCountAsBridge
  }
  resetDayDate(day: TimeGroupSchedule, index: number){
    day.clock_in = '';
    day.clock_out = '';
    day.calculate_bridging = false;
    day.invalidTime = false;
    if(index > 0 && index < 6){
     this.scheduleDays[index-1].calculate_bridging = false;
     this.scheduleDays[index+1].calculate_bridging = false;
    }
    else {
      if(index == 0 ){
        this.scheduleDays[1].calculate_bridging = false;
        this.scheduleDays[6].calculate_bridging = false;
      }
      else { 
        this.scheduleDays[0].calculate_bridging = false;
        this.scheduleDays[5].calculate_bridging = false;
      }
    }
    this.invalidAllDaysTime = this.scheduleDays.filter(day => (day.invalidTime && !day.is_off)).length > 0;
  }
  
}