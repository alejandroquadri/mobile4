import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

import { AuthData } from './auth-data';

@Injectable()
export class DiaryData {

  diarySubject = new ReplaySubject(1);
  diaryObs = this.diarySubject.asObservable();
  diary: any;

  constructor(
    public af: AngularFire,
    public authData: AuthData,
  ) {
    this.getDiary().subscribe( diary => {
      this.diarySubject.next(diary);
      this.diary = diary;
    });
  }

  getDiary(): FirebaseObjectObservable<any> {
    return this.af.database.object(`/diary/${this.authData.fireAuth.uid}`);
  }

  getDetail(date, key) {
    return firebase.database().ref(`/diary/${this.authData.fireAuth.uid}/${date}/${key}`).once('value');
  }

  updateList(form, key, day:string): firebase.Promise<void> {
    return this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}`)
    .update(key, form)
  }

  pushEntry(form, day: string): firebase.database.ThenableReference {
    console.log('entra', form, day);
    return this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}`)
    .push(form)
  }

  getMeal(day, array): FirebaseObjectObservable<any> {
    return this.af.database.object(`/diary/${this.authData.fireAuth.uid}/${day}/${array}`)
  }

  getMeal2 (day, array) {
    this.diaryObs.subscribe( diary => {
      return diary[this.authData.fireAuth.uid][day][array];
    })
  }

  pushReview(day,array,review): firebase.database.ThenableReference {
    return this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}/${array}/reviews`)
    .push(review);
  }

  pushImg(day, key, path, img) {
    console.log('push img', img)
    return this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}/${key}/${path}`)
    .push(img)
  }

}
