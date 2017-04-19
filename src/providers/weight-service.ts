import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class WeightService {

  constructor(
  	public af: AngularFire
	) {}

  push(log: string, timestamp: string): firebase.database.ThenableReference{
  	return this.af.database.list(`/weightLogs/${firebase.auth().currentUser.uid}`)
  	.push({
  		log: log,
  		timestamp: timestamp
  	});
  }

  getWeightLogs() {
  	return this.af.database.list(`/weightLogs/${firebase.auth().currentUser.uid}`)
  }

}
