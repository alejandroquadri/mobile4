import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {

  fireAuth: any;
  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
    this.user.subscribe( (user: any) => {
      this.fireAuth = user;
    })
  }

  current() {
    return this.afAuth.auth;
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  // para esto uso el JS SDK, no esta disponible todavia en AF2
  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then(newUser => {
      this.afDb.object(`/userProfile/${newUser.uid}`)
      .set({email:newEmail});
    })
  }

  setProfileData(displayName?: string, photoURL?: string): firebase.Promise<any>{
    const form = {
      displayName: this.fireAuth.displayName,
      photoURL: this.fireAuth.photoURL
    };

    if (displayName) { form['displayName'] = displayName }
    if (photoURL) { form['photoURL'] = photoURL }

    return firebase.auth().currentUser.updateProfile(form)
  }
}




