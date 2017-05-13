import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import {AngularFire} from 'angularfire2';

// servicios
import { CameraService } from '../../../providers/camera-service';
import { DiaryData } from '../../../providers/diary-data';
import { ActivityService } from '../../../providers/activity.service'

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
  ) {}

  goToDetail(meal) {
    this.detail.emit(meal);
  }

  addPicture() {
    let key;
    const day = this.day.format("YYYYMMDD");
    this.camera.takePicture('diary', 30);
    let diaryImageObs = this.camera.imageData.take(1);
    let uploadObs = this.camera.uploadData.take(1);

    diaryImageObs.subscribe( (img: any) => {
      if (img !=='cancelled') {
        this.diaryData.pushEntry({
          state: 'pending',
          order: this.mealInput.order, 
          meal: this.mealInput.meal,
          localImages: [img.localImage]
        }, day)
        .then( ret => {
          key = ret.key;
          this.camera.toBlob(img.file);
          this.text().then(text => {
            if( text !== "") {
              this.diaryData.updateList({text: text}, key, day)
            }
          });
        });
      }
    });

    uploadObs.subscribe( url => {
      this.diaryData.updateList({webImages:[url]}, key, day)
      .then( () => {
        this.activityService.updatePendingReviewCount()
        .then ( () => console.log('updated pending'))
      })
    });
  }

  newText() {
    this.text().then(text => {
      console.log(text);
      this.diaryData.pushEntry({
          state: 'pending',
          order: this.mealInput.order, 
          meal: this.mealInput.meal,
          text: text
        }, this.day.format("YYYYMMDD"))
      .then( () => this.activityService.updatePendingReviewCount())
    });
  }

  private text (){
    return new Promise((resolve, reject) => {
    let alert = this.alertCtrl.create({
      message: "Que comiste?",
      inputs: [{
          name: "meal",
          placeholder: "Que comiste?",
      }],
      buttons: [
        { text: 'Cancelar'},
        { text: 'Guardar',
          handler: data => {
            console.log(data);
            resolve(data.meal) 
          }
        }
      ]
    });
    alert.present();
    });
  }

}
