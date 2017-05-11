import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire,  } from 'angularfire2';
import * as moment from 'moment';

import { ProfileData, ChatService, ActivityService } from '../../providers';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  messages: any;
  profile: any;
  profileObject: any
  coachProfile: any;
  chat: any;
  @ViewChild('txtChat') txtChat;
  @ViewChild('chatUi') chatUi;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public profileData: ProfileData,
    public chatService: ChatService,
    public activityService: ActivityService
) {}

  ionViewDidLoad() {
    this.profileObject = this.profileData.current;
    this.profileData.getCoachProfileOnce()
    .then( coach => {
      this.coachProfile = coach.val()
    })
    this.chat = this.chatService.getChat(this.profileObject.coach , this.profileObject.$key)
  }

  ionViewDidEnter(){
    console.log('entre');
    this.profileObject = this.profileData.current;
    setTimeout(() => {
      this.scrollToBottom()
    }, 500);
    this.chatService.mesRead();
  }

  ionViewDidLeave() {
    this.chatService.offCheckRead();
  }

  scrollToBottom(): void {
    console.log('to bottom');
    this.chatUi.scrollToBottom(300);
  }  

  send() {
    if (this.txtChat.content !== '') {
      let form = {
        content: this.txtChat.content,
        uid: this.profileObject.$key,
        read: false,
        displayName: this.profileObject.displayName,
        timestamp: moment().format(),
      }
      this.chatService.pushMsg(this.profileObject.coach, this.profileObject.$key, form)
      .then (
        (ret) => {
          this.activityService.updateUnreadMsgCoach(true);
          console.log('msg sent'); 
          this.txtChat.content = '';
          this.scrollToBottom();
        },
        (err) => console.log('error', err)
      );

    }
  }


}
