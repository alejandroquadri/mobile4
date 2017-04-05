import { Component,  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire,  } from 'angularfire2';

import { AuthData } from '../../providers/auth-data';

import { ElasticTextarea } from '../../shared/components/elastic-text-area.component';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  messages: any;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public authData: AuthData,
) {
    this.messages = [
      {
        content :  'Am I dreaming?',
        position : 'left',
        time : '12/3/2016',
        senderName : 'Gregory'
      },
      {
        content :  'yes!',
        position : 'right',
        time : '12/3/2016',
        senderName : 'Matt'
      },
      {
        content :  'How do you know?',
        position : 'left',
        time : '12/3/2016',
        senderName : 'Gregory'
      }
    ]
}

  ionViewDidLoad() {
    console.log('Hello ChatPage Page');
  }


}
