import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// importo AngularFire2 module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Keyboard } from '@ionic-native/keyboard';

// paginas importadas
import { DiaryPage } from '../pages/diary/diary';
import { ChatPage } from '../pages/chat/chat';
import { MePage } from '../pages/me/me';
import { ConfigPage } from '../pages/config/config';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ProgressPage } from '../pages/progress/progress';
import { CoachPage } from '../pages/coach/coach';
import { MealDetailPage } from '../pages/meal-detail/meal-detail';

// Components
import { WeekCalendarComponent } from '../pages/diary/week-calendar/week-calendar';
import { DiaryEntryComponent } from '../pages/diary/diary-entry/diary-entry';
import { ElasticTextarea } from '../shared/components/elastic-text-area.component';

// providers importados
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { CameraService } from '../providers/camera-service';
import { DiaryData } from '../providers/diary-data';

// pipes
import { SortPipe } from '../shared/pipes/sort.pipe';
import { SortAddPipe } from '../shared/pipes/sort-add.pipe';
import { ObjectToArrayPipe } from '../shared/pipes/object-to-array.pipe';
import { ObjectIteratePipe } from '../shared/pipes/object-iterate.pipe';
import { MomentDatePipe } from '../shared/pipes/moment-date.pipe';
import { MomentFromNowPipe } from '../shared/pipes/moment-from-now.pipe';
import { CountKeysPipe } from '../shared/pipes/count-keys.pipe';


// settings AF2
export const firebaseConfig = {
  apiKey: "AIzaSyC9EFx_1rQDM0YOleEC-CstB58D0JMj0pA",
  authDomain: "dietapp-9f200.firebaseapp.com",
  databaseURL: "https://dietapp-9f200.firebaseio.com",
  storageBucket: "dietapp-9f200.appspot.com",
  messagingSenderId: "1075458661299"
};

// esto le dice a AF2 que voy a usar Email & Password para autenticacion
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    DiaryPage,
    ChatPage,
    MePage,
    ConfigPage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    ProgressPage,
    CoachPage,
    MealDetailPage,
    WeekCalendarComponent,
    DiaryEntryComponent,
    ElasticTextarea,
    SortPipe,
    SortAddPipe,
    ObjectToArrayPipe,
    ObjectIteratePipe,
    MomentDatePipe,
    MomentFromNowPipe,
    CountKeysPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      pageTransition: 'md-transition'
    }), // esto es para que junto tappable no tarde unos segundos en hacer click
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiaryPage,
    ChatPage,
    MePage,
    ConfigPage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    ProgressPage,
    CoachPage,
    MealDetailPage,
    WeekCalendarComponent,
    DiaryEntryComponent
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
    SortPipe,
    SortAddPipe,
    ObjectToArrayPipe,
    ObjectIteratePipe,
    MomentDatePipe,
    MomentFromNowPipe,
    CountKeysPipe
  ]
})
export class AppModule {}
