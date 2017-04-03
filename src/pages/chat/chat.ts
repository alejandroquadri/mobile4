import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseApp } from 'angularfire2';

import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  public storage: any;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public authData: AuthData,
    @Inject(FirebaseApp) firebaseApp: any
) {
  this.storage = firebaseApp.storage()
  console.log('storage', this.storage);
}

  ionViewDidLoad() {
    console.log('Hello ChatPage Page');
  }

  upload(){
    let image = "./assets/images/smiley-cyrus.jpg";
    let blob = new Blob([image], {type: 'image/jpeg'});
    console.log('blob', Blob);
    let imageName = 'smiley-cyrus';
    console.log('auth', this.authData.fireAuth.uid);
    let storageRef = this.storage.ref()
    console.log('storageRef', storageRef);
    let uploadTask = storageRef.child(this.authData.fireAuth.uid + '/prueba').child(imageName).put(blob)
    uploadTask.on('state_changed', (snapshot) => {
        console.info(snapshot);
    }, (error) => {
        console.error(error);
    }, () => {
        let downloadURL = uploadTask.snapshot.downloadURL;
        console.log('downloadURL', downloadURL);
    })
  }

}
