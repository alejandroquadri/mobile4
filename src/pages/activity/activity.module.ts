import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from './activity';

import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [ActivityPage],
  imports: [
  	IonicPageModule.forChild(ActivityPage),
  	PipesModule
	],
})
export class TabsPageModule { }