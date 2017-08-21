import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthData, ProfileData, PresenceService } from '../providers';

@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  connected = true;
  first = true;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public authData: AuthData,
    public presenceService: PresenceService,
    public toastCtrl: ToastController,
  ) {
    
      authData.user.subscribe( user => {
        this.platform.ready().then(() => {
          console.log('platform ready');
          if (user) {
            console.log(this.authData.fireAuth);
            this.rootPage = 'TabsPage';
          } else {
            this.authData.fireAuth = null;
            this.rootPage = 'LoginPage';
          }
        })
      })

      // this.profileData.getProfile()
      // .subscribe( profile => {
      //   console.log('profile cargado');
      //   if (profile) {
      //     this.rootPage = 'TabsPage';
      //     if (this.first) { 
      //       statusBar.styleDefault();
      //       splashScreen.hide();
      //       this.first = false;
      //     }
      //   }
      // })


      // this.presenceService.connected.subscribe( con => {
      //   console.log('is connected', con);
      //   if (!con) {
      //     this.presentToast('connexion perdida');
      //     this.connected = false;
      //   }
      //   if( con && !this.connected) {
      //     this.presentToast('connexion recuperada');
      //   }
      // })
      
      // keyboard.onKeyboardShow().subscribe(() => {
      //   document.body.classList.add('keyboard-is-open');
      // });

      // keyboard.onKeyboardHide().subscribe(() => {
      //   document.body.classList.remove('keyboard-is-open');
      // });

  }

  presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000
    });
    toast.present();
  }
}
