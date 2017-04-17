import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class ChatService {

  chat: any;

  constructor(
  	public af: AngularFire,
	){
    console.log('Hello ChatService Provider');
  }

  getChat(chatUid: string): FirebaseListObservable<any[]> {
  	return this.af.database.list(`/chats/${chatUid}`)
  }

  pushMsg(chatUid: string, msg:any): firebase.database.ThenableReference {
  	return this.af.database.list(`/chats/${chatUid}`)
  	.push(msg);
  }

  updateMsg(chatUid: string, msg:any, newMsg:any): firebase.Promise<void>{
  	return this.af.database.list(`/chats/${chatUid}`)
  	.update(msg, newMsg)
  }

  removeMsg(chatUid: string, msg:any): firebase.Promise<void> {
  	return this.af.database.list(`/chats/${chatUid}`)
  	.remove(msg)
  }

  mesRead (chatUid: string, author: string) {
    this.offCheckRead();
    this.chat = firebase.database().ref(`/chats/${chatUid}`);
    this.chat.on('child_added', (data) => {
      if (author !== data.val().uid) {
        this.chat.child(data.key).update({read: true})
        .then(() => console.log('updated'),
          err => console.log('error')
        );
      }
    });
  }

  getChatFireSDK(chatUid: string) {
    console.log(chatUid);
    firebase.database().ref(`/chats/${chatUid}`)
    .on('value', data => console.log(data.val()));
  }

  offCheckRead() {
    if (this.chat) {
      console.log('check msj read off');
      this.chat.off(); 
    }
  }

}
