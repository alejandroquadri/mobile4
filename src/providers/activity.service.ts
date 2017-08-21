import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as firebase from 'firebase';

import { ProfileData} from './profile-data';
import { AuthData } from './auth-data';
import { FirebaseApiDataProvider } from './firebaseApi-data';

@Injectable()
export class ActivityService {

  activitySubject = new ReplaySubject(1);
  activityObs = this.activitySubject.asObservable();
  activity: any;

  constructor(
    private api: FirebaseApiDataProvider,
    public authData: AuthData,
    public profileData: ProfileData
	) {
    this.authData.user.subscribe( user => {
      if(user) {
        this.getActivity(user.uid).subscribe( activity => {
          this.activitySubject.next(activity);
          this.activity = activity;
        });
      }
    })
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

  getActivity(user) {
    return this.api.getObject(`/activity/patients/${user}`)
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
