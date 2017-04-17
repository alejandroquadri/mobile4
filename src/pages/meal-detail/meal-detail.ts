import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { DiaryData } from '../../providers/diary-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';

@Component({
  selector: 'page-meal-detail',
  templateUrl: 'meal-detail.html'
})
export class MealDetailPage {

	mealParams: any;
	meal: any;
  mealData: any;
	// message: any;
	profile: any
  @ViewChild('txtChat') txtChat;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public diaryData: DiaryData,
  	public profileData: ProfileData,
    public alertCtrl: AlertController,
    public camera: CameraService
	) {
  	this.mealParams = this.navParams.data
    console.log(this.mealParams);
    this.meal = this.diaryData.getMeal(this.mealParams.date, this.mealParams.$key);
    this.meal.subscribe( data => this.mealData = data);
    this.profileData.profileObs.subscribe( profile => {
    	this.profile = profile;
    })
	}

  ionViewDidLoad() {
    
  }

  addPicture() {
    let localImages, webImages
    if (this.mealData.localImages){
      localImages = this.mealData.localImages;
    } else {
      localImages = [];
    }

    if (this.mealData.webImages){
      webImages = this.mealData.webImages;
    } else {
      webImages = [];
    }

    this.camera.takePicture('diary', 30);
    let diaryImageObsFirst = this.camera.imageData.take(1);
    let diaryImageObsSecond = this.camera.imageData.take(2).skip(1);

    diaryImageObsFirst.subscribe(
      (imageData:any) => {
        localImages.push(imageData);
        this.diaryData.updateList({localImages: localImages}, this.mealParams.$key,this.mealParams.date)
        .then( 
          ret => console.log('local image saved', ret),
          err => console.log('error', err)
        );
      },
      err => console.log('error en diaryImageObs first', err),
      () => {
        console.log('termino diaryImageObs first')
      }
    );

    diaryImageObsSecond.subscribe(
      (imageData:any) => {
        webImages.push(imageData);
        this.diaryData.updateList({webImages: webImages, state: 'pending'}, this.mealParams.$key,this.mealParams.date)
        .then( 
          ret => console.log('web image saved', ret),
          err => console.log('error', err)
        );
      },
      err => console.log('error en diaryImageObs second', err),
      () => console.log('termino diaryImageObs second')
    );

  }

  editText(){
    console.log('edit');
    let alert = this.alertCtrl.create({
      message: "Que comiste?",
      inputs: [{
          name: "meal",
          placeholder: "Que comiste?",
          value: this.mealData.text || ''
      }],
      buttons: [
        { text: 'Cancelar'},
        { text: 'Guardar',
          handler: data => {
            this.diaryData.updateList({text: data.meal, state: 'pending'},this.mealParams.$key,this.mealParams.date)
            .then(
              () => console.log('updated'),
              (err) => console.log('error', err)
            );
          }
        }
      ]
    });
    alert.present();
  }

  sendReview() {
  	console.log(this.txtChat.content);
  	let form = {
  		message: this.txtChat.content,
  		name: this.profile.displayName,
  		timestamp: moment().format(),
  	}
  	this.diaryData.pushReview(this.mealParams.date, this.mealParams.$key, form)
  	.then( 
  		ret => {
  		console.log('enviado', ret);
  		this.txtChat.content = '';
      this.diaryData.updateList({state: 'pending'},this.mealParams.$key,this.mealParams.date);
	  	},
	  	err => console.log('error al enviar mensaje', err)
  	);
  }

  send(mes) {
    console.log(mes);
    this.txtChat.content = '';
  }

  addPciture() {
    
  }

}
