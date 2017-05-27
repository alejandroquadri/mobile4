import { Component, Renderer } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-log-weight',
  templateUrl: 'log-weight.html',
})
export class LogWeight {

	weight: any;
	weightInput: any;

  constructor(
  	public viewCtrl: ViewController,
  	public renderer: Renderer
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogWeight');
  }

  ionViewDidEnter() {
  	this.weightInput = document.getElementById('weightInput').getElementsByTagName('input')[0];
  	console.log(this.weightInput);
  	this.renderer.invokeElementMethod(this.weightInput, 'focus');
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

  save() {
   let data = { 'log': this.weight };
   this.viewCtrl.dismiss(data);
  }

}
