import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFire } from 'angularfire2';

import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { PresenceService } from '../providers';


// paginas
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(
    public platform: Platform,
    public af: AngularFire,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public authData: AuthData,
    public profileData: ProfileData,
    public presenceService: PresenceService
  ) {
    this.authData.current().subscribe( user => {
      if (user) {
        this.profileData.getProfile()
        .subscribe( profile => {
          if (profile) {
            this.rootPage = TabsPage;
          }
        })
      } else {
        this.rootPage = LoginPage;
      }
    })

    this.presenceService.connected.subscribe( con => {
      console.log('is connected', con);
    })

    this.platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
      });

      keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
      });
    })

  }

}
