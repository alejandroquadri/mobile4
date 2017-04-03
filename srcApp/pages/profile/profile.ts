import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

// clases
import { ProfileForm } from './profileForm';

// servicios
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  avatar: string = "./assets/images/smiley-cyrus.jpg";
  profileForm: ProfileForm;

  constructor(
    public navCtrl: NavController,
    public authData: AuthData,
    public profileData: ProfileData,
    public camera: CameraService,
    public af: AngularFire,
    public loadingCtrl: LoadingController
  ) {
    this.profileForm = new ProfileForm;
  }

  ionViewDidLoad() {
    this.profileData.setProfile();
    this.profileData.profileObs
    .subscribe( data => {
      console.log('actualiza', data);
      this.profileForm = data;
    })
  }

  logOut(){
    this.authData.logoutUser()
  }

  updateUser(){
    console.log('update user', this.profileForm);
    let updateProfile = {
      firstName :  this.profileForm.firstName || '',
      lastName : this.profileForm.lastName || '',
      bio : this.profileForm.bio || '',
      displayName: this.profileForm.displayName || '',
      birthDate: this.profileForm.birthDate || '',
    }
    console.log('form a actualizar', updateProfile);
    this.profileData.updateProfile(updateProfile);
  }

  updateAvatar(){
    this.camera.takePicture('profile');
    let profileImageObs = this.camera.imageData.take(2)
    profileImageObs.subscribe((imageData:any) => {
      console.log('data de observable en profile', JSON.stringify(imageData));
      this.profileData.updateProfile(imageData);
    },
    err => console.log('error', err),
    () => console.log('termino profileImageObs'))
  }

  updateAvatar2() {
    this.camera.takePicture('profile');

    let localImageObs = this.camera.imageData.take(1);
    let webImageObs = this.camera.imageData.take(2).skip(1);

    localImageObs.subscribe(
      (imageData:any) => {
        let form = {localPath: imageData}
        this.profileData.updateProfile(form);
      },
      err => console.log('error en localImageObs second', err),
      () => console.log('termino localImageObs second')
    )

    webImageObs.subscribe(
      (imageData:any) => {
        let form = {url: imageData}
        this.profileData.updateProfile(form);
      },
      err => console.log('error en webImageObs second', err),
      () => console.log('termino webImageObs second')
    )
  }


}
