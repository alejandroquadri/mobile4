import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import * as moment from 'moment';

import { DiaryData } from '../../providers/diary-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';

// paginas
// import { MealTextPage } from '../meal-text/meal-text';

@IonicPage()
@Component({
  selector: 'page-meal-detail',
  templateUrl: 'meal-detail.html'
})
export class MealDetailPage {

	mealParams: any;
	meal: any;
  mealData: any;
	message: any;
	profile: any

  // para que funcione el teclado
  @ViewChild(Content) content: Content;
  inputElement: any;
  millis = 200;
  scrollTimeout = this.millis + 50;
  textareaHeight
  scrollContentElement: any;
  footerElement: any;
  initialTextAreaHeight;
  keyboardHideSub: any;
  keybaordShowSub: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public modalCtrl: ModalController,
  	public diaryData: DiaryData,
  	public profileData: ProfileData,
    public camera: CameraService,
    public keyboard: Keyboard,
    public platform: Platform,
    public renderer: Renderer
	) {
  	this.mealParams = this.navParams.data
    console.log(this.mealParams);
    this.meal = this.diaryData.getMeal(this.mealParams.date, this.mealParams.$key);
    this.meal.subscribe( data => this.mealData = data);
  	this.profile = this.profileData.current;
	}

  ionViewDidLoad() {
    this.addKeyboardStyle();
  }

  ionViewDidEnter(){
    if (this.platform.is('ios')) {
      this.addKeyboardListeners();
    }
    this.keyboard.disableScroll(true);
    this.updateScroll('enter', 500)
  }

  ionViewDidLeave() {
    if (this.platform.is('ios')) {
      this.removeKeyboardListeners();
    }
    this.keyboard.disableScroll(false);
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
        localImages.push(imageData);
        this.diaryData.updateList({localImages: localImages}, this.mealParams.$key,this.mealParams.date)
        .then( 
          ret => {
            console.log('local image saved', ret);
            this.camera.toBlob(imageData);
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

  pathForImage(img) {
    return this.camera.pathForImage(img);
  }

  sendReview() {
    let mes = this.message;
    this.message = ''
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

  editText() {
    this.modalText({edit: this.mealData});
  }

  modalText(form: any) {
    console.log(form);
    let modal = this.modalCtrl.create('MealTextPage', form); 
    modal.present()
  }

  addKeyboardStyle() {

    this.scrollContentElement = this.content.getScrollElement();
    this.footerElement = document.getElementsByTagName('page-meal-detail')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('page-meal-detail')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText +
      "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElement.style.cssText = this.scrollContentElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;
  }

  addKeyboardListeners() {

    this.keyboardHideSub = this.keyboard.onKeyboardHide().subscribe(() => {
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44 //+ this.tabsHeight;
      let marginBottom = newHeight + 'px';

      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = this.keyboard.onKeyboardShow().subscribe((e) => {

      let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
      let marginBottom = newHeight + 44 + 'px';

      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
      this.updateScroll('keybaord show', this.scrollTimeout);
    });

  }

  removeKeyboardListeners() {
    // console.log('salen los listeners');
    this.keyboardHideSub.unsubscribe();
    this.keybaordShowSub.unsubscribe();
  }

  footerTouchStart(event) {
    // console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
      // console.log('preventing')
    }
  }

  contentMouseDown(event) {
    // console.log('blurring input element :- > event type:', event.type);
    this.inputElement.blur();
  }

  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElement.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }

  touchSendButton(event: Event) {
    // console.log('touchSendButton, event type:', event.type);
    event.preventDefault();
    this.sendReview();
  }

  updateScroll(from, timeout) {
    setTimeout(() => {
      // console.log('updating scroll -->', from)
      this.content.scrollToBottom();
    }, timeout);
  }

}
