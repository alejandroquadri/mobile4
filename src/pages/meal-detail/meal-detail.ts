import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { DiaryData } from '../../providers/diary-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';

// paginas
import { MealTextPage } from '../meal-text/meal-text';


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
    public modalCtrl: ModalController,
  	public diaryData: DiaryData,
  	public profileData: ProfileData,
    public alertCtrl: AlertController,
    public camera: CameraService
	) {
  	this.mealParams = this.navParams.data
    console.log(this.mealParams);
    this.meal = this.diaryData.getMeal(this.mealParams.date, this.mealParams.$key);
    this.meal.subscribe( data => this.mealData = data);
  	this.profile = this.profileData.current;
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
    let uploadObs = this.camera.uploadData.take(1);

    diaryImageObsFirst.subscribe(
      (imageData:any) => {
        localImages.push(imageData.localImage);
        this.diaryData.updateList({localImages: localImages}, this.mealParams.$key,this.mealParams.date)
        .then( 
          ret => {
            console.log('local image saved', ret);
            this.camera.toBlob(imageData.file);
          },
          err => console.log('error', err)
        );
      },
      err => console.log('error en diaryImageObs first', err),
      () => {
        console.log('termino diaryImageObs first')
      }
    );

    uploadObs.subscribe( 
      imageData => {
        webImages.push(imageData);
        this.diaryData.updateList({webImages: webImages, state: 'pending'}, this.mealParams.$key,this.mealParams.date)
        .then( 
          ret => console.log('web image saved', ret),
          err => console.log('error', err)
        );
      },
      err => console.log('error en diaryImageObs second', err),
      () => console.log('termino diaryImageObs second')
     )

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

  sendReview(mes) {
  	// console.log(this.txtChat.content);
  	let form = {
  		message: mes,
  		name: this.profile.displayName,
  		timestamp: moment().format(),
  	}
  	this.diaryData.pushReview(this.mealParams.date, this.mealParams.$key, form)
  	.then( 
  		ret => {
  		console.log('enviado', ret);
      this.diaryData.updateList({state: 'pending'},this.mealParams.$key,this.mealParams.date);
	  	},
	  	err => console.log('error al enviar mensaje', err)
  	);
  }

  editText2() {
    this.modalText({edit: this.mealData});
  }

  modalText(form: any) {
    console.log(form);
    let modal = this.modalCtrl.create(MealTextPage, form); 
    modal.present()
  }

  // send(mes) {
  //   console.log(mes);
  //   this.txtChat.content = '';
  // }

}
