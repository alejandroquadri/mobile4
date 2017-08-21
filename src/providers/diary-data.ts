import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

import { FirebaseApiDataProvider } from './firebaseApi-data';
import { AuthData } from './auth-data';

@Injectable()
export class DiaryData {

  diarySubject = new ReplaySubject(1);
  diaryObs = this.diarySubject.asObservable();
  diary: any;

  constructor(
    private authData: AuthData,
    private api: FirebaseApiDataProvider
  ) {
    this.authData.user.subscribe( user => {
      if(user) {
        this.getDiary(user.uid).subscribe( diary => {
          this.diarySubject.next(diary);
          this.diary = diary;
        });
      }
    })
  }

  getDiary(user) {
    return this.api.getObject(`/diary/${user}`);
  }

  getDetail(date, key) {
    return firebase.database().ref(`/diary/${this.authData.fireAuth.uid}/${date}/${key}`).once('value');
  }

  updateList(form, key, day:string) {
    return this.api.updateList(`/diary/${this.authData.fireAuth.uid}/${day}`,key, form);
  }

  pushEntry(form, day: string) {
    console.log('entra', form, day);
    return this.api.push(`/diary/${this.authData.fireAuth.uid}/${day}`, form);
  }

  getMeal(day, array) {
    return this.api.getObject(`/diary/${this.authData.fireAuth.uid}/${day}/${array}`);
  }

  // getMeal2(day, array) {
  //   this.diaryObs.subscribe( diary => {
  //     return diary[this.authData.fireAuth.uid][day][array];
  //   })
  // }

  pushReview(day,array,review) {
    return this.api.push(`/diary/${this.authData.fireAuth.uid}/${day}/${array}/reviews`, review);
  }

  pushImg(day, key, path, img) {
    console.log('push img', img)
    return this.api.push(`/diary/${this.authData.fireAuth.uid}/${day}/${key}/${path}`, img);
  }

}
