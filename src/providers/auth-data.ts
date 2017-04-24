import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  fireAuth: any;
  authObs: any;

  constructor(
    public af: AngularFire,
  ) {
    // af.auth.subscribe( user => {
    //   if (user) {
    //     this.fireAuth = user.auth;
    //   }
    // });
    this.authObs = this.current()
    .subscribe( user => {
      if (user) { this.fireAuth = user.auth}
    })
  }

  current(): AngularFireAuth {
    return this.af.auth
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  // para esto uso el JS SDK, no esta disponible todavia en AF2
  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.af.auth.logout()
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword })
    .then(newUser => {
      this.af.database.object(`/userProfile/${newUser.uid}`)
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




