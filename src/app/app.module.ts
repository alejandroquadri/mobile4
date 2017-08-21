import { NgModule, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// importo AngularFire2 module
// import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Keyboard } from '@ionic-native/keyboard';

// Servicios
import { AuthData, 
        ProfileData, 
        CameraService, 
        DiaryData, 
        ChatService, 
        WeightService, 
        ActivityService, 
        PresenceService,
        FirebaseApiDataProvider } from '../providers';

// settings AF2
export const firebaseConfig = {
  apiKey: "AIzaSyC9EFx_1rQDM0YOleEC-CstB58D0JMj0pA",
  authDomain: "dietapp-9f200.firebaseapp.com",
  databaseURL: "https://dietapp-9f200.firebaseio.com",
  storageBucket: "dietapp-9f200.appspot.com",
  messagingSenderId: "1075458661299"
};

// esto le dice a AF2 que voy a usar Email & Password para autenticacion
// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Password,
//   method: AuthMethods.Password
// }

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'md-transition',
      ios: {
          scrollAssist: false, 
          autoFocusAssist: false,
          inputBlurring: false
        }
    }), // esto es para que junto tappable no tarde unos segundos en hacer click
    // AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    Camera,
    File,
    Keyboard,
    AuthData,
    ProfileData,
    CameraService,
    DiaryData,
    ChatService,
    WeightService,
    ActivityService,
    PresenceService,
    FirebaseApiDataProvider
  ]
})
export class AppModule {}
