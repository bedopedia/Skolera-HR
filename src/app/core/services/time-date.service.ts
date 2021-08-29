import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';
import { Globals } from '@core/globals';

@Injectable()
export class TimeDateService {
  constructor(
    public globals: Globals

  ) { 
    this.setTimeZone();
  }

  setTimeZone() {
    if (!this.globals.timezone) {
      this.setGlobalTimeZone(); 
    }
  }

  setGlobalTimeZone() {
    this.globals.timezone = JSON.parse(localStorage.getItem('timezone'));
  }

  newDate(date?, format?, timezone?) {
    let returnDate;
    if (date == null) {
      returnDate = new Date();
    } else {
      returnDate = new Date(date);
    }
    if (timezone == null) {
      timezone = this.globals.timezone;
    }
    if (format == null) {
      return moment(returnDate).tz(timezone).format();
    }
    return moment(returnDate).tz(timezone).format(format);
  }

  getPreviousDay() {
    return this.newUTCDate(new Date().setDate(new Date().getDate() - 1));
  }

  setDateToStartOfDay(date) {
    return moment(date).tz(this.globals.timezone).startOf('day').utc().format(); 
  }

  setDateToEndOfDay(date) {
    return moment(date).tz(this.globals.timezone).endOf('day').utc().format(); 
  }

  newUTCDate(date?, keepLocalTime?) {
    let returnDate;
    if (date == null) {
      returnDate = new Date;
    } else {
      returnDate = new Date(date);
    }
    if (keepLocalTime == null){
        keepLocalTime = true;
    }
    return moment(returnDate).utcOffset('+00:00', keepLocalTime).format();
  }

  addDaysToDate(date, days = 0) {
    return moment(this.newDate(date)).add(days, 'd').format();
  }

  isBefore(start, end) {
    return moment(start).isBefore(end);
  }

  getWeek(weekPosition = 0, addByWeek = false) {
    const startOfWeek = moment().startOf('week').add(weekPosition, addByWeek ? 'w' : 'd');
    const endOfWeek = moment().endOf('week').add(weekPosition, addByWeek ? 'w' : 'd');
    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(this.dateObjectBuilder(day.toObject(),
        this.getDayOnly(day.toDate()), this.getMonthOnly(day.toDate()),
        this.getFullDateOnly(day.toDate())));
      day = day.add(1, 'd');
    }
    return days;
  }

  getDayOnly(fullDate) {
    return moment.parseZone(fullDate).format('ddd');
  }
  getCurrentDay() {
    return moment().format('ddd');
  }

  getDayDateOnly(fullDate) {
    return moment(fullDate).format('DD');
  }

  getMonthOnly(fullDate) {
    return moment(fullDate).format('MMM');
  }

  getFullDateOnly(fullDate) {
    return moment(fullDate).format('YYYY-M-D');
  }

  private dateObjectBuilder(dateObject, dayName, monthName, fullDate) {
    return {
      year: dateObject.years,
      month: dateObject.months + 1,
      day: dateObject.date,
      name: dayName,
      month_name: monthName,
      fullDate: fullDate
    };
  }

  getDateByDateObject(dateObject) {
    const stringDate = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
    return this.newDate(moment(stringDate, 'YYYY-M-D'), 'YYYY-MM-DD');
  }

  sendEndOfDayWithUtc(dateObject) {
    return this.newUTCDate(this.setDateToEndOfTheDay(dateObject));
  }

  sendEndOfDayMachineTime(dateObject) {
    return new Date(this.setDateToEndOfTheDay(dateObject));
  }

  setDateToEndOfTheDay(dateObject) {
    return new Date(dateObject).setHours(23, 59, 59, 999);
  }

  getDateByFormat(fullDate, format) {
    return moment(fullDate).format(format);
  }

  convertDateToSchoolTimeZone(date) {
    const myTime = moment.tz(date, moment.ISO_8601, Intl.DateTimeFormat().resolvedOptions().timeZone);
    const sameTimeDifferentZone = moment.tz(myTime.format('YYYY-MM-DDTHH:mm:ss.SSS'), moment.ISO_8601, this.globals.timezone);
    return sameTimeDifferentZone.utc().format();
  }

  convertDateToLocalTimeZone(date) {
    const myTime = moment.tz(date, moment.ISO_8601, this.globals.timezone);
    const sameTimeDifferentZone = moment.tz(myTime.format('YYYY-MM-DDTHH:mm:ss.SSS'), Intl.DateTimeFormat().resolvedOptions().timeZone);
    return sameTimeDifferentZone.format();
  }  

  formatDateWithSchoolTimeZone(date) {
    return moment(date).tz(this.globals.timezone).format('YYYY-MM-DDTHH:mm:ss')
  }

  formatDateWithSchoolTimeZoneWithTime(date, time) {    
      const dateTime = moment(date).format('YYYY-M-D ' + time)
      return this.convertDateToSchoolTimeZone(moment(dateTime).tz(this.globals.timezone))
  }

  formatDateWithLocalTimezone(date) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss')
  }  

  fullDayFormat(date) {
    return moment(date).format('YYYY-MM-DD')
  }

  hoursMinutesFormat(date, timezone?) {
    if (timezone) {
      return moment(date).tz(timezone).format("HH:mm")
    } else {
      return moment(date).format("HH:mm")
    }
  }
}
