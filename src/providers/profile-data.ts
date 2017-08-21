import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { FirebaseApiDataProvider } from './firebaseApi-data';
import { AuthData } from './auth-data';

@Injectable()
export class ProfileData {

  // profileObs: FirebaseObjectObservable<any>;
  current: any;

  constructor(
    private api: FirebaseApiDataProvider,
    public authData: AuthData
  ) {
    this.authData.user.subscribe( user => {
      if(user) {
        this.getProfile().subscribe( prof => {
          this.current = prof;
        })
      } else {
        this.current = null;
      }
    })
  }

  updateProfile(form){
    return this.api.updateObject(`/userProfile/${this.authData.fireAuth.uid}`, form);
  }

  updateProfileFan(form): firebase.Promise<any> {
    const root = firebase.database().ref();
    const paths = [
      `userProfile/${this.authData.fireAuth.uid}`,
      `coachPatients/${this.current.coach}/${this.authData.fireAuth.uid}`
    ] ;
    const updates = this.fanOutObject(form, paths )
    return root.update(updates);
  }

  private fanOutObject (updateForm: any, paths: Array<string>) {
    const fanObject = {}
    const updateFormKeys = Object.keys(updateForm);
    paths.forEach( path => {
      updateFormKeys.forEach( updateKey => {
        fanObject[`${path}/${updateKey}`] = updateForm[updateKey]
      })
    })
    console.log(fanObject);
    return fanObject;
  }

  getProfile(){
    return this.api.getObject(`/userProfile/${this.authData.fireAuth.uid}`);
  }

  coachProfile(coachuid) {
    return this.api.getObject(`coachProfile/${coachuid}`);
  }

  getProfileOnce(): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}`).once('value');
  }

  getCurrent() {
    return this.current;
  }

  getCoachProfileOnce() {
    return firebase.database().ref(`coachProfile/${this.current.coach}`).once('value');
  }
}
