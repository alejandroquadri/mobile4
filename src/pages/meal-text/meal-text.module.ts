import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealTextPage } from './meal-text';

import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [MealTextPage],
  imports: [
	  IonicPageModule.forChild(MealTextPage),
	  ElasticModule
  ],
})
export class MealTextPageModule { }