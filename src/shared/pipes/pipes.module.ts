import { NgModule } from '@angular/core';

import { CountKeysPipe} from './count-keys.pipe';
import { MomentDatePipe } from './moment-date.pipe';
import { MomentFromNowPipe } from './moment-from-now.pipe';
import { ObjectIteratePipe } from './object-iterate.pipe';
import { ObjectToArrayPipe } from './object-to-array.pipe';
import { SortAddPipe } from './sort-add.pipe';
import { SortPipe } from './sort.pipe';


@NgModule({
  declarations: [
  	CountKeysPipe,
  	MomentDatePipe,
  	MomentFromNowPipe,
  	ObjectIteratePipe,
  	ObjectToArrayPipe,
  	SortAddPipe,
  	SortPipe
  ],
  exports: [
	  CountKeysPipe,
  	MomentDatePipe,
  	MomentFromNowPipe,
  	ObjectIteratePipe,
  	ObjectToArrayPipe,
  	SortAddPipe,
  	SortPipe
  ],
  providers: [
  	CountKeysPipe,
  	MomentDatePipe,
  	MomentFromNowPipe,
  	ObjectIteratePipe,
  	ObjectToArrayPipe,
  	SortAddPipe,
  	SortPipe
  ]
})
export class PipesModule {}