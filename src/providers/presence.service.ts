import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class PresenceService {

	public connectedSubject = new Subject<boolean>();
  public connected = this.connectedSubject.asObservable();

  constructor(
  	public zone: NgZone
  ) {
  	this.checkPresence();
  }

  checkPresence() {
  	let connectedRef = firebase.database().ref(".info/connected");
		connectedRef.on("value", snap => {
				if (snap.val() === true) {
			    this.connectedSubject.next(true);
			  } else {
			    this.connectedSubject.next(false);
			  }
			})
  }

}
