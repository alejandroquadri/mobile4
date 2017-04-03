import { Component } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavController } from 'ionic-angular';
// import 'rxjs/add/operator/take';

import { CameraService } from '../../providers/camera-service';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  // numberSubject = new BehaviorSubject(1);
  // numberObs = this.numberSubject.asObservable();
  value = 0;

  constructor(
    public navCtrl: NavController,
    public camera: CameraService
  ) {}

  ionViewDidLoad() {
    let obsConfig = this.camera.numberObs.take(3)
    obsConfig.subscribe( valor => {
      console.log('va a sumar', valor);
      this.value = this.value + valor;
    },
    err => console.log('error', err),
    () => console.log('termino')
    )
  }

  add(){
    // this.numberSubject.next(1);
    this.camera.addOne()
  }

}
