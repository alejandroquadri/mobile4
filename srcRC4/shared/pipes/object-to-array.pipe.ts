import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'object-to-array'
})

@Injectable()
export class ObjectToArrayPipe implements PipeTransform {
	transform(value: any, args?: any[]): any[] {
    // create instance vars to store keys and final output
    let keyArr: any[] = Object.keys(value)
    let dataArr = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
    	// en esta linea conservo el id de firebase para poder
    	// modificarlo o borrarlo despues
    	value[key]['$key'] = key;
      dataArr.push(value[key]);
    });

    // return the resulting array
    return dataArr;
  }
}