import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {
  transform(value: any, format: string): any {
    if (value) {
      return moment(value).format(format);
    } else {
      return;
    }
  }
}
