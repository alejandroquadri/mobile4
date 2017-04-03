import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { DiaryData } from '../../providers/diary-data';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-meal-detail',
  templateUrl: 'meal-detail.html'
})
export class MealDetailPage {

	mealParams: any;
	meal: any;
	message: any;
	profile: any

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public diaryData: DiaryData,
  	public profileData: ProfileData
	) {
  	this.mealParams = this.navParams.data
    console.log(this.mealParams);
    this.meal = this.diaryData.getMeal(this.mealParams.date, this.mealParams.$key);
    this.profileData.profileObs.subscribe( profile => {
    	this.profile = profile;
    })
	}

  ionViewDidLoad() {
    
  }

  sendReview() {
  	console.log(this.message);
  	let form = {
  		message: this.message,
  		name: this.profile.displayName,
  		timestamp: moment().format(),
  	}
  	this.diaryData.pushReview(this.mealParams.date, this.mealParams.$key, form)
  	.then( 
  		ret => {
  		console.log('enviado', ret);
  		this.message = '';
	  	},
	  	err => console.log('error al enviar mensaje', err)
  	);
  }

}
