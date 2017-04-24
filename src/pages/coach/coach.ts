import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProfileData } from '../../providers/profile-data'

@Component({
  selector: 'page-coach',
  templateUrl: 'coach.html'
})
export class CoachPage {

	coachProf: any;
	avatar: string = "./assets/images/smiley-cyrus.jpg";

  constructor(
  	public navCtrl: NavController,
  	public profileData: ProfileData
  ) {}

  ionViewDidLoad() {
    this.profileData.getCoachProfileOnce()
    .then( coachProf => this.coachProf = coachProf.val())
  }

}
