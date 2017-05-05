import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

import { ProfileData } from './profile-data';

@Injectable()
export class ActivityService {

  constructor(
  	public af: AngularFire,
    public profileData: ProfileData
	) {}

  updatePendingReviewCount(): firebase.Promise<any> {
    return firebase.database().ref(`/activity/coaches/${this.profileData.current.coach}/${this.profileData.current.$key}/pendingReviews`)
    .transaction( value => {      
        return value + 1;
    });
  }

}
