import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { ProfileData } from '../../providers/profile-data';
import { WeightService } from '../../providers/weight-service';


@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

	weightLogs: any;
	weightLogsObject: any;
	profile: any;
	actual: number;

  constructor(
  	public navCtrl: NavController,
  	public profileData: ProfileData,
  	public weightService: WeightService,
  	public alertCtrl: AlertController
  ) {
  	this.weightLogs = this.weightService.getWeightLogs()
  	this.weightLogs.subscribe( data => {
  		this.weightLogsObject = data;
  		this.actualWeight(this.weightLogsObject);
  	})
  	this.profileData.getProfileOnce()
  	.then( prof => this.profile = prof.val() )
  }

  ionViewDidLoad() {
  	
  }

  logWeight() {
  	let alert = this.alertCtrl.create({
      message: "Registra tu peso",
      inputs: [{
          name: "log",
          type: "number"
      }],
      buttons: [
        { text: 'Cancelar'},
        { text: 'Guardar',
          handler: data => {
            if (data.log) {
            	this.weightService.push(data.log, moment().format())
            	.then( 
            		ret => console.log('weight logged', ret.key),
            		err => console.log('error', err)
          		);
            }
          }
        }
      ]
    });
    alert.present();
  }

  actualWeight(array) {
  	this.actual = +array[array.length-1].log;
  }

}
