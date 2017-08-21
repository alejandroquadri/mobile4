import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { FirebaseApiDataProvider } from './firebaseApi-data';
import { ProfileData } from './profile-data';
import { ActivityService } from './activity.service';

@Injectable()
export class ChatService {

  chat: any;
  unread: any;
  added: any;

  constructor(
    private api: FirebaseApiDataProvider,
    public profileData: ProfileData,
    public activityService: ActivityService
	){
    this.chat = firebase.database().ref(`/chats/${this.profileData.current.coach}&${this.profileData.current.$key}`);
  }

  getChat(coachUid: string, patientUid: string) {
    return this.api.getList(`/chats/${coachUid}&${patientUid}`);
  }

  pushMsg(coachUid: string, patientUid: string, msg:any){
    return this.api.push(`/chats/${coachUid}&${patientUid}`, msg);
  	// return this.af.database.list(`/chats/${coachUid}&${patientUid}`)
  	// .push(msg);
  }

  updateMsg(coachUid: string, patientUid: string, msg:any, newMsg:any){
    return this.api.updateList(`/chats/${coachUid}&${patientUid}`, msg, newMsg);
  }

  removeMsg(coachUid: string, patientUid: string, msg:any) {
    return this.api.removeItemList(`/chats/${coachUid}&${patientUid}`,msg);
  }

  mesRead () {
    this.offCheckRead();

    this.added = this.chat.on('child_added', (data) => {
      if ((this.profileData.current.$key !== data.val().uid) && (data.val().read === false)) {
        this.chat.child(data.key).update({read: true})
        .then(
          () => console.log('updated'),
          err => console.log('error')
        );
        this.activityService.updateUnreadMsgPatient(false);
      }
    });
  }

  offCheckRead() {
    if (this.added) {
      this.chat.off('child_added', this.added)
    }
    
  }

}
