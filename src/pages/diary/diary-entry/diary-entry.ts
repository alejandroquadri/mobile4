import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

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
    public platform: Platform,
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

  newText() {
    let form = {
        state: 'pending',
        order: this.mealInput.order, 
        meal: this.mealInput.meal,
        date: this.day.format("YYYYMMDD")
      }
    this.modalText({form: form})
  }

  modalText(form: any) {
    let modal = this.modalCtrl.create('MealTextPage', form); 
    modal.present()
  }

}
