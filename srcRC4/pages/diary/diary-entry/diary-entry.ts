import { Component, Input, Output, EventEmitter} from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import {AngularFire} from 'angularfire2';

// servicios
import { CameraService } from '../../../providers/camera-service';
import { DiaryData } from '../../../providers/diary-data';

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
    public af: AngularFire,
  ) {}

  goToDetail(meal) {
    this.detail.emit(meal);
  }

  addText(key?: string){
    let alert = this.alertCtrl.create({
      message: "Que comiste?",
      inputs: [{
          name: "meal",
          placeholder: "Que comiste?",
          value: this.mealInput.text || ''
      }],
      buttons: [
        { text: 'Cancelar'},
        { text: 'Guardar',
          handler: data => {
            if (key) {
              this.update('text',data.meal, key)
            } else {
              this.update('text',data.meal);              
            }
          }
        }
      ]
    });
    alert.present();
  }

  addPicture(){
    let localImages, webImages, key
    if (this.mealInput.localImages){
      localImages = this.mealInput.localImages;
    } else {
      localImages = [];
    }

    if (this.mealInput.webImages){
      webImages = this.mealInput.webImages;
    } else {
      webImages = [];
    }
    
    this.camera.takePicture('diary');
    let diaryImageObsFirst = this.camera.imageData.take(1);
    let diaryImageObsSecond = this.camera.imageData.take(2).skip(1);

    diaryImageObsFirst.subscribe(
      (imageData:any) => {
        localImages.push(imageData);
        this.update('localImages',localImages)
        .then(
          ret => {
            console.log('key array', ret.key)
            key = ret.key
            if (!this.mealInput.text) {this.addText(key)}
          },
          err => console.log('error', err)
        );
      },
      err => console.log('error en diaryImageObs first', err),
      () => {
        console.log('termino diaryImageObs first')
      }
    )

    diaryImageObsSecond.subscribe(
      (imageData:any) => {
        webImages.push(imageData);
        this.update('webImages',webImages, key);
      },
      err => console.log('error en diaryImageObs second', err),
      () => console.log('termino diaryImageObs second')
    )
  }

  private update(prop: string, value: any, key?: string): any {
    let form = {
      order: this.mealInput.order, 
      meal: this.mealInput.meal
    };
    form[prop] = value;
    if (this.mealInput.$key || key) {
      console.log('existe');
      if (this.mealInput.$key) { key = this.mealInput.$key}
      return this.diaryData.updateList(form, key, this.day.format("YYYYMMDD"))
    } else {
      console.log('no existe');
      return this.diaryData.pushEntry(form, this.day.format("YYYYMMDD"))
    }
  }

}
