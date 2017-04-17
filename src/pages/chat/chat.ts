import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire,  } from 'angularfire2';
import * as moment from 'moment';

import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { ChatService } from '../../providers/chat-service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage implements AfterViewChecked {

  messages: any;
  profile: any;
  profileObject: any
  coachProfile: any;
  chat: any;
  chatUid: string;
  @ViewChild('txtChat') txtChat;
  @ViewChild('chatUi') chatUi;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public authData: AuthData,
    public profileData: ProfileData,
    public chatService: ChatService
) {
    this.profile = this.profileData.profileObs
    this.profile.subscribe( profile => {
      this.profileObject = profile;
      this.profileData.coachProfile(profile.coach).subscribe(coach => {
        this.coachProfile = coach;
      })
      this.chatUid = `${this.profileObject.coach}&${this.authData.fireAuth.uid}`;
      this.chat = this.chatService.getChat(this.chatUid);
      this.chatService.mesRead(this.chatUid, this.profileObject.$key);
      this.chatService.getChatFireSDK(this.chatUid);
    })
}
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ionViewDidEnter(){
    this.chatUid = `${this.profileObject.coach}&${this.authData.fireAuth.uid}`;
    this.chat = this.chatService.getChat(this.chatUid);
    this.chatService.mesRead(this.chatUid, this.profileObject.$key);
  }

  ionViewDidLeave() {
    this.chatService.offCheckRead();
  }

  scrollToBottom(): void {
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
      this.chatService.pushMsg(this.chatUid, form)
      .then (
        (ret) => {
          console.log('msg sent', ret); 
          this.txtChat.content = '';
        },
        (err) => console.log('error', err)
      );
    }
  }


}
