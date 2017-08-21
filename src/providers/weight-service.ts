import { Injectable } from '@angular/core';

import { FirebaseApiDataProvider } from './firebaseApi-data';
import * as firebase from 'firebase';

@Injectable()
export class WeightService {

  constructor(
    private api: FirebaseApiDataProvider,
	) {}

  push(log: string, timestamp: string) {
  	return this.api.push(`/weightLogs/${firebase.auth().currentUser.uid}`,{log: log,timestamp: timestamp});
  }

  getWeightLogs() {
  	return this.api.getList(`/weightLogs/${firebase.auth().currentUser.uid}`);
  }

}
