import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    splashScreen: SplashScreen
  ) {
    af.auth.subscribe( user => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    this.platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    })

  }

}
