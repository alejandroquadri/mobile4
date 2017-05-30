import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ElasticModule } from 'angular2-elastic';

import { MealDetailPage } from './meal-detail';

import { PipesModule } from '../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
  	MealDetailPage,
  ],
  imports: [
	  IonicPageModule.forChild(MealDetailPage),
	  ElasticModule,
	  PipesModule
  ]
})
export class MealDetailPageModule { }