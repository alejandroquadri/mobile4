import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as firebase from 'firebase';

import { ProfileData } from './profile-data';

@Injectable()
export class ActivityService {

  activitySubject = new ReplaySubject(1);
  activityObs = this.activitySubject.asObservable();
  activity: any;

  constructor(
  	public af: AngularFire,
    public profileData: ProfileData
	) {
    this.getActivity().subscribe( activity => {
      this.activitySubject.next(activity);
      this.activity = activity;
    });
  }

  updatePendingReviewCount(): firebase.Promise<any> {
    return firebase.database().ref(`/activity/coaches/${this.profileData.current.coach}/${this.profileData.current.$key}/pendingReviews`)
    .transaction( value => {      
        return value + 1;
    });
  }

  updateUnreadMsgCoach(add: boolean) {
    return firebase.database().ref(`/activity/coaches/${this.profileData.current.coach}/${this.profileData.current.$key}/unreadMsgs`)
    .transaction( value => {      
        if (add) {
          return value + 1;
        } else {
          if (value > 0) {
            return value - 1;
          } else {
            return value;
          }
        }
    });
  }

  updateUnreadMsgPatient(add: boolean) {
   return firebase.database().ref(`/activity/patients/${this.profileData.current.$key}/unreadMsgs`)
    .transaction( value => {      
        if (add) {
          return value + 1;
        } else {
          if (value > 0) {
            return value - 1;
          } else {
            return value;
          }
        }
    }); 
  }

  getActivity() {
    return this.af.database.object(`/activity/patients/${this.profileData.current.$key}`)
  }

  markAsSeenReview(key: string) {
    return firebase.database().ref(`/activity/patients/${this.profileData.current.$key}/feed/${key}/read`)
    .transaction( value => {
      return true;
    })
  }

  updateUnseenReview(unseen: number) {
    return firebase.database().ref(`/activity/patients/${this.profileData.current.$key}/unReadFeed`)
    .transaction( value => {
      return unseen;
    });
  }

}
