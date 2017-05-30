import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachPage } from './coach';

import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [CoachPage],
  imports: [
	  IonicPageModule.forChild(CoachPage),
	  ElasticModule
  ],
})
export class CoachPageModule { }