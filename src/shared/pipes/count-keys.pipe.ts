import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countKeys'
})
export class CountKeysPipe implements PipeTransform {
  transform(value: any): any {
      if (value) {
        console.log(value);
        const keyArr: any[] = Object.keys(value)
        return keyArr.length;
      } else {
        console.log('nada');
        return;
      }
    }
}