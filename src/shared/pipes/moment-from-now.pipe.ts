import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Pipe({
  name: 'momentFromNow'
})
export class MomentFromNowPipe implements PipeTransform {
  transform(value: any, format?: string): any {
    if (value) {
      return moment(value).fromNow();
    } else {
      return;
    }
  }
}

