import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import {AngularFire} from 'angularfire2';

// servicios
import { CameraService } from '../../../providers/camera-service';
import { DiaryData } from '../../../providers/diary-data';
import { ActivityService } from '../../../providers/activity.service'

// paginas
import { MealTextPage } from '../../meal-text/meal-text';

@Component({
  selector: 'diary-entry',
  templateUrl: 'diary-entry.html'
})

export class DiaryEntryComponent {

  @Input() day;
  @Input() mealInput;
  @Output() detail = new EventEmitter();

  constructor(
    public camera: CameraService,
    public alertCtrl: AlertController,
    public diaryData: DiaryData,
    public activityService: ActivityService,
    public af: AngularFire,
    public modalCtrl: ModalController
  ) {}

  goToDetail(meal) {
    this.detail.emit(meal);
  }

  addPicture() {
    this.camera.takePicture('diary', 30);
    let diaryImageObs = this.camera.imageData.take(1);

    diaryImageObs.subscribe( (img: any) => {
      if (img !=='cancelled') {
        let form = {
            state: 'pending',
            order: this.mealInput.order, 
            meal: this.mealInput.meal,
            localImages: [img],
            date: this.day.format("YYYYMMDD")
          }
        this.modalText({form: form, img: img})
      }
    });
  }

  pathForImage(img) {
    return this.camera.pathForImage(img);
  }

  newText2() {
    let form = {
        state: 'pending',
        order: this.mealInput.order, 
        meal: this.mealInput.meal,
        date: this.day.format("YYYYMMDD")
      }
    this.modalText({form: form})
  }

  modalText(form: any) {
    let modal = this.modalCtrl.create(MealTextPage, form); 
    modal.present()
  }

   // addPicture() {
  //   let key;
  //   const day = this.day.format("YYYYMMDD");
  //   this.camera.takePicture('diary', 30);
  //   let diaryImageObs = this.camera.imageData.take(1);
  //   let uploadObs = this.camera.uploadData.take(1);

  //   diaryImageObs.subscribe( (img: any) => {
  //     if (img !=='cancelled') {
  //       this.text().then(text => {
  //         let form = {
  //           state: 'pending',
  //           order: this.mealInput.order, 
  //           meal: this.mealInput.meal,
  //           localImages: [img.localImage],
  //           date: this.day.format("YYYYMMDD")
  //         }
  //         if( text !== "") { form['text'] = text;}
  //         this.diaryData.pushEntry(form, day)
  //         .then( ret => {
  //           key = ret.key;
  //           this.camera.toBlob(img.file);
  //         });
  //       });
  //     }
  //   });

  //   uploadObs.subscribe( url => {
  //     console.log('segunda');
  //     this.diaryData.updateList({webImages:[url]}, key, day)
  //     .then( () => {
  //       this.activityService.updatePendingReviewCount()
  //       .then ( () => console.log('updated pending'))
  //     })
  //   });
  // }

  // newText() {
  //   this.modalText().then(
  //     text => {
  //     console.log(text);
  //     // this.diaryData.pushEntry({
  //     //     state: 'pending',
  //     //     order: this.mealInput.order, 
  //     //     meal: this.mealInput.meal,
  //     //     text: text
  //     //   }, this.day.format("YYYYMMDD"))
  //     // .then( () => this.activityService.updatePendingReviewCount())
  //     })
  //   .catch( err => console.log(err)) 

  // }

  // private text (){
  //   return new Promise((resolve, reject) => {
  //   let alert = this.alertCtrl.create({
  //     message: "Que comiste?",
  //     inputs: [{
  //         name: "meal",
  //         placeholder: "Que comiste?",
  //     }],
  //     buttons: [
  //       { text: 'Cancelar'},
  //       { text: 'Guardar',
  //         handler: data => {
  //           console.log(data);
  //           resolve(data.meal) 
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  //   });
  // }

}
