import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DiaryPage } from './diary';
import { DiaryEntryComponent } from './diary-entry/diary-entry';
import { WeekCalendarComponent } from './week-calendar/week-calendar';

import { PipesModule } from '../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
  	DiaryPage,
  	DiaryEntryComponent,
  	WeekCalendarComponent
  ],
  imports: [
	  IonicPageModule.forChild(DiaryPage),
	  PipesModule
  ]
})
export class DiaryPageModule { }