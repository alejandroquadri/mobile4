import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthData {
  current: any;
  public userProfile: any;
  fireAuth: any;
  user: any

  constructor(
    public af: AngularFire,
  ) {
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    });
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  // para esto uso el JS SDK, no esta disponible todavia en AF2
  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout()
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword })
    .then(newUser => {
      this.af.database.object(`/userProfile/${newUser.uid}`)
      .set({email:newEmail, coach: false});
      //.update({email:newEmail, coach: false});
      // podria escribir lo de arriba y tambien crea la direccion

    })
  }

  setCurrent(user){
    return this.current = user;
  }

  setProfileData(form: any): any {
    console.log(form);
    const profileForm = {};
    if (form.displayName) { 
      console.log('hay displayname')
      profileForm['displayName'] = form.displayName 
    }
    if (form.photoURL) { 
      console.log('hay photoURL')
      profileForm['photoURL'] = form.photoURL 
    }
    console.log(profileForm);
    this.user.updateProfile(profileForm);
  }

}

