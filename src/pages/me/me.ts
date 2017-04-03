import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// paginas
import { ProfilePage } from '../profile/profile';
import { ProgressPage } from '../progress/progress';
import { CoachPage } from '../coach/coach';

// providers

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  public current: any
  public avatar: string = "./assets/images/smiley-cyrus.jpg";
  public profileForm: any;

  constructor(
    public navCtrl: NavController,
  ) {}

  ionViewDidLoad() {
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goToProgress(){
    this.navCtrl.push(ProgressPage);
  }

  goToCoach(){
    this.navCtrl.push(CoachPage);
  }

}
