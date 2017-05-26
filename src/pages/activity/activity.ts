import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';

import { DiaryData, ActivityService } from '../../providers';
import { MealDetailPage } from '../meal-detail/meal-detail';

import { ObjectToArrayPipe } from '../../shared/pipes/object-to-array.pipe';


@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

	activity: any;
	diary: any
	newActivity: any;
	oldActivity: any;
	food: string = "./assets/images/ensalada.jpg";

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
    public app: App,
  	public diaryData: DiaryData,
  	public activityService: ActivityService,
  	private objectToArray: ObjectToArrayPipe
	){
  	this.diary = this.diaryData.diaryObs;
  	this.activity = this.activityService.activityObs;
  	this.getNewActivity();
  }

  ionViewDidLoad() {
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

  goToDetail(date: string, mealkey: string, isNew?: boolean, feedKey?: string) {
  	this.diaryData.getDetail(date, mealkey)
  	.then( mealData => {
  		let meal = mealData.val();
  		meal['date'] = date;
  		meal['$key'] = mealkey;
	    this.navCtrl.push(MealDetailPage, meal);
      // this.app.getRootNav().push(MealDetailPage, meal);
  	})
  	if(isNew) { this.activityService.markAsSeenReview(feedKey); }
  }

  getNewActivity() {
  	this.activityService.activityObs.subscribe( (act: any) => {
  		let feed = this.objectToArray.transform(act.feed);
  		this.newActivity = feed.filter( item => {
  			if (item.read === false ) { return true}
  		});
  		this.oldActivity = feed.filter( item => {
  			if (item.read === true ) { return true}
  		});
  		console.log('hay estas sin ver', this.newActivity.length);
  		this.activityService.updateUnseenReview(this.newActivity.length)
  	})
  }

}
