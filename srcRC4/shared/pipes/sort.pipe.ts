import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort'
})

@Injectable()
export class SortPipe implements PipeTransform {
	transform(array: Array<any>, field: string, asc: boolean): Array<any> {
		if (array) {
			if (asc){
				array.sort((a: any, b: any) => {
		      if (a[field] < b[field]) {
		        return -1;
		      } else if (a[field] > b[field]) {
		        return 1;
		      } else {
		        return 0;
		      }
		    });
		    return array;
			} else {
				array.sort((a: any, b: any) => {
		      if (a[field] > b[field]) {
		        return -1;
		      } else if (a[field] < b[field]) {
		        return 1;
		      } else {
		        return 0;
		      }
		    });
		    return array;
			}
		} else { return [] }
  }
}

