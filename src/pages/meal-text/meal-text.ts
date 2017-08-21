import { Component, Renderer, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

// servicios
import { CameraService } from '../../providers/camera-service';
import { DiaryData } from '../../providers/diary-data';
import { ActivityService } from '../../providers/activity.service'


@IonicPage()
@Component({
  selector: 'page-meal-text',
  templateUrl: 'meal-text.html',
})
export class MealTextPage {

	form: any;
	img: any;
	edit: any
	text: any;
	ionTextArea: any;
	@ViewChild('textArea') textArea: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
  	public renderer: Renderer,
  	public camera: CameraService,
    public diaryData: DiaryData,
    public activityService: ActivityService,
  ) {
  	this.form = navParams.get('form');
  	this.img = navParams.get('img');
  	this.edit = navParams.get('edit');
  	console.log(this.form);
  	console.log(this.edit);

  }

  ionViewDidLoad() {
  	if(this.edit) {
  		this.text =	this.edit.text;
  	}
  }

  ionViewDidEnter() {
  	this.ionTextArea = document.getElementsByTagName('page-meal-text')[0].getElementsByTagName('textarea')[0];
  	this.renderer.invokeElementMethod(this.ionTextArea, 'focus');
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }

  save() {
  	if(!this.edit) {
  		console.log('nuevo');
			this.push();
  	}
  	if (this.edit) {
  		console.log('update');
  		this.update();
  	}
  }

  push() {
  	if(this.text) { this.form['text'] = this.text }
  	this.diaryData.pushEntry(this.form, this.form.date)
      .then( (ret: any) => {
      	this.activityService.updatePendingReviewCount();
      	if(this.img) {
      		console.log('sube imagen');
      		this.upload(this.img, ret.key);
      	}
      })
		this.viewCtrl.dismiss();
  }

   upload(img, key) {
   	this.camera.toBlob(img);
    let uploadObs = this.camera.uploadData.take(1);
   	uploadObs.subscribe( url => {
      console.log('segunda');
      this.diaryData.updateList({webImages:[url]}, key, this.form.date)
      .then( () => {
      	console.log('subido imagen');
      })
    });
   }

   update() {
   	this.diaryData.updateList({text: this.text, state: 'pending'},this.edit.$key,this.edit.date)
	    .then(
	      () => console.log('updated'),
	      (err) => console.log('error', err)
	    );
	  this.viewCtrl.dismiss();
   }

}
