import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFire } from 'angularfire2';

import { AuthData, ProfileData, PresenceService } from '../providers';


// paginas
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  first = true;

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
    this.platform.ready().then(() => {
      console.log('platform ready');
      this.authData.current().subscribe( user => {
        if (user) {
          this.profileData.getProfile()
          .subscribe( profile => {
            console.log('profile cargado');
            if (profile) {
              this.rootPage = TabsPage;
              if (this.first) { 
                statusBar.styleDefault();
                splashScreen.hide();
              }
            }
          })
        } else {
          this.rootPage = LoginPage;
        }
      })

      this.presenceService.connected.subscribe( con => {
        console.log('is connected', con);
      })
      
      keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
      });

      keyboard.onKeyboardHide().subscribe(() => {
        document.body.classList.remove('keyboard-is-open');
      });
    })

  }
}
