import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import Chart from 'chart.js';

import { ProfileData } from '../../providers/profile-data';
import { WeightService } from '../../providers/weight-service';

// import { LogWeight } from '../log-weight/log-weight'


@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

	weightLogs: any;
	weightLogsArray: Array<any>;
	data: Array<any> = new Array();
	labels: Array<any> = new Array();
	profile: any;
	actual: number;
	@ViewChild('lineCanvas') lineCanvas;
	chart: any;

  constructor(
  	public navCtrl: NavController,
  	public profileData: ProfileData,
  	public weightService: WeightService,
  	public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
  	
  }

  ionViewDidLoad() {
    this.weightLogs = this.weightService.getWeightLogs()
    this.weightLogs.subscribe( data => {
      this.weightLogsArray = data;
      this.actualWeight(this.weightLogsArray);
      this.prepareChartData(this.weightLogsArray);
      this.buildGraph(this.data, this.labels);
    })
    this.profile = this.profileData.current;
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
            		(ret: any) => console.log('weight logged', ret.key),
            		err => console.log('error', err)
          		);
            }
          }
        }
      ]
    });
    alert.present();
  }

  log() {
    let log = this.modalCtrl.create('LogWeight');
    log.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.weightService.push(data.log, moment().format())
        .then( 
          (ret: any) => console.log('weight logged', ret.key),
          err => console.log('error', err)
        );
      }
    });
    log.present();
  }

  actualWeight(array) {
  	if (array.length) {
  		this.actual = +array[array.length-1].log;
  	} else {
  		this.actual = this.profile.initialWeight;
  	}
  }

  prepareChartData(data: Array<any>) {	
  	this.data = [];
  	this.labels = [];
  	if (data.length) {
  		console.log(data.length);
  		data.forEach( log => {
	  		this.data.push(log.log);
	  		this.labels.push(moment(log.timestamp).format('D/M'));
	  	})
	  	console.log(this.data, this.labels);
  	}
  }

  buildGraph(data, labels) {
  	if( data.length && labels.length ) {
  		this.chart = new Chart(this.lineCanvas.nativeElement, {
	      type: 'line',
	      data: {
			    labels: labels,
			    datasets: [
		        {	
		        	label: "Log de peso",
	            fill: true,
	            // lineTension: 0.1,
	            backgroundColor: "rgba(75,192,192,0.4)",
	            borderColor: "rgba(75,192,192,1)",
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: "rgba(75,192,192,1)",
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 1,
	            pointHoverRadius: 5,
	            pointHoverBackgroundColor: "rgba(75,192,192,1)",
	            pointHoverBorderColor: "rgba(220,220,220,1)",
	            pointHoverBorderWidth: 2,
	            pointRadius: 1,
	            pointHitRadius: 10,
	            data: data,
	            spanGaps: false,
		        }
			    ]
				},
				options: {
					legend: {
						display: false
					}
				}
	    });
  	}
  }

}
