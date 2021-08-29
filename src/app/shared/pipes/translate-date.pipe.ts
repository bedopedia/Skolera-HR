import { Pipe, PipeTransform } from '@angular/core';
import { Globals } from '@core/globals';
import * as moment from 'moment';
import 'fix-date'

@Pipe({
  name: 'translateDate'
})
export class TranslateDatePipe implements PipeTransform {
    constructor(
        private globals: Globals
    ) { }
    transform(date: any, format: any): any {
        let d = new Date(date)
        return moment(d).locale(this.globals.currentUser.locale).format(format);
      }
}
