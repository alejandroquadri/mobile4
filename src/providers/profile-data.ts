import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthData } from './auth-data';

@Injectable()
export class ProfileData {

  profileObs: FirebaseObjectObservable<any>;
  current: any;

  constructor(
    public af: AngularFire,
    public authData: AuthData
  ) {
    this.authData.current().subscribe( user => {
      if(user) {
        this.af.database.object(`/userProfile/${user.uid}`)
        .subscribe( prof => {
          this.current = prof;
        })
      } else {
        this.current = null;
      }
    })
  }

  updateProfile(form){
    this.af.database.object(`/userProfile/${this.authData.fireAuth.uid}`)
    .update(form)
  }

  getProfile(){
    return this.af.database.object(`/userProfile/${this.authData.fireAuth.uid}`)
  }

  coachProfile(coachuid): FirebaseObjectObservable<any> {
    return this.af.database.object(`coachProfile/${coachuid}`);
  }

  getProfileOnce(): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}`).once('value');
  }

  getCurrent() {
    return this.current;
  }

  getCoachProfileOnce2(coachuid): firebase.Promise<any> {
    return firebase.database().ref(`coachProfile/${coachuid}`).once('value');
  }

  getCoachProfileOnce() {
    return firebase.database().ref(`coachProfile/${this.current.coach}`).once('value');
  }

}
