import { Injectable, NgZone } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { ProfileData } from './profile-data';
import { ActivityService } from './activity.service';

@Injectable()
export class ChatService {

  chat: any;
  unread: any;
  added: any;

  constructor(
  	public af: AngularFire,
    public zone: NgZone,
    public profileData: ProfileData,
    public activityService: ActivityService
	){
    this.chat = firebase.database().ref(`/chats/${this.profileData.current.coach}&${this.profileData.current.$key}`);
  }

  getChat(coachUid: string, patientUid: string): FirebaseListObservable<any[]> {
  	return this.af.database.list(`/chats/${coachUid}&${patientUid}`)
  }

  pushMsg(coachUid: string, patientUid: string, msg:any): firebase.database.ThenableReference {
  	return this.af.database.list(`/chats/${coachUid}&${patientUid}`)
  	.push(msg);
  }

  updateMsg(coachUid: string, patientUid: string, msg:any, newMsg:any): firebase.Promise<void>{
  	return this.af.database.list(`/chats/${coachUid}&${patientUid}`)
  	.update(msg, newMsg)
  }

  removeMsg(coachUid: string, patientUid: string, msg:any): firebase.Promise<void> {
  	return this.af.database.list(`/chats/${coachUid}&${patientUid}`)
  	.remove(msg)
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
