import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [ProfilePage],
  imports: [
  	IonicPageModule.forChild(ProfilePage),
  	ElasticModule
	],
})
export class ProfilePageModule { }