import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort-add'
})

@Injectable()
export class SortAddPipe implements PipeTransform {
	transform(array: Array<any>, field: string, asc: boolean): Array<any> {
		if (array) {
			// console.log(array)
			let arrayAdded = this.addMeal(array);
			
			if (asc){
				arrayAdded.sort((a: any, b: any) => {
		      if (a[field] < b[field]) {
		        return -1;
		      } else if (a[field] > b[field]) {
		        return 1;
		      } else {
		        return 0;
		      }
		    });
		    return arrayAdded;
			} else {
				arrayAdded.sort((a: any, b: any) => {
		      if (a[field] > b[field]) {
		        return -1;
		      } else if (a[field] < b[field]) {
		        return 1;
		      } else {
		        return 0;
		      }
		    });
		    return arrayAdded;
			}
		} else { return [] }
  }

  addMeal(array) {
  	if (!this.findMeal(array, 'desayuno')) {array.push({meal:'desayuno', order:0})}
		if (!this.findMeal(array, 'colacion mañana')) { array.push({meal:'colacion mañana', order:1})}
  	if (!this.findMeal(array, 'almuerzo')) { array.push({meal:'almuerzo', order:2})}
		if (!this.findMeal(array, 'colacion tarde')) { array.push({meal:'colacion tarde', order:3})}
		if (!this.findMeal(array, 'te')) { array.push({meal:'te', order:4})}
		if (!this.findMeal(array, 'cena')) { array.push({meal:'cena', order:5})}
		return array
  }

	findMeal(array: Array<any>, meal: string) {
		for (let i=0; i < array.length; i++){
			if (array[i].meal === meal) {
				return true;
			}
		}
		return false;
	}
}

