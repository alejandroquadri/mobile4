import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { AuthData } from './auth-data';

@Injectable()
export class ProfileData {

  public profileObs: Observable<any>;
  current;

  constructor(
    public af: AngularFire,
    public authData: AuthData
  ) {
    this.setProfile();
    this.profileObs.subscribe(data => {
      this.current = data});
  }

  updateProfile(form){
    this.af.database.object(`/userProfile/${this.authData.fireAuth.uid}`)
    .update(form)
  }

  setProfile(){
    this.profileObs = this.af.database.object(`/userProfile/${this.authData.fireAuth.uid}`);
  }

  coachProfile(coachuid): FirebaseObjectObservable<any> {
    return this.af.database.object(`coachProfile/${coachuid}`);
  }

  getProfileOnce(): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}`).once('value');
  }

}
