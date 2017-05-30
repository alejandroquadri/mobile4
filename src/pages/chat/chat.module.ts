import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ElasticModule } from 'angular2-elastic';

import { ChatPage } from './chat';

import { PipesModule } from '../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
  	ChatPage,
  ],
  imports: [
	  IonicPageModule.forChild(ChatPage),
	  ElasticModule,
	  PipesModule
  ]
})
export class ChatPageModule { }