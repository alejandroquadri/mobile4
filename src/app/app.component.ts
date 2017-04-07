import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFire } from 'angularfire2';


// paginas
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(
    private platform: Platform,
    af: AngularFire,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private keyboard: Keyboard
  ) {
    af.auth.subscribe( user => {
      if (user) {
        console.log('va al root')
        this.rootPage = TabsPage;
      } else {
        console.log('va al login')
        this.rootPage = LoginPage;
      }
    });

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
