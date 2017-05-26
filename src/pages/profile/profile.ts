import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

// clases
import { Profile } from './profile.model';

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
  profileForm: Profile;

  constructor(
    public navCtrl: NavController,
    public authData: AuthData,
    public profileData: ProfileData,
    public camera: CameraService,
    public af: AngularFire,
    public loadingCtrl: LoadingController
  ) {
    this.profileForm = new Profile;
  }

  ionViewDidLoad() {
    this.profileData.getProfile()
    .subscribe( data => {
      console.log('actualiza', data);
      this.profileForm = data;
    })
  }

  logOut(){
    this.authData.logoutUser()
    .then( 
      () => console.log('user unlogged'),
      err => console.log('error', err)
    );
  }

  updateUser(){
    console.log('update user', this.profileForm);
    let updateProfile = {
      firstName :  this.profileForm.firstName || '',
      lastName : this.profileForm.lastName || '',
      bio : this.profileForm.bio || '',
      displayName: this.profileForm.displayName || '',
      birthDate: this.profileForm.birthDate || '',
      initialWeight: this.profileForm.initialWeight || '',
      objectiveWeight: this.profileForm.objectiveWeight || ''
    }
    console.log('form a actualizar', updateProfile);
    this.profileData.updateProfileFan(updateProfile)
    .then( 
      ret => {
        console.log('actualizado', ret);
      },
      err => console.log('error', err)
    );

    if (this.profileForm.displayName) { 
      this.authData.setProfileData(this.profileForm.displayName)
      .then( 
        (ret) => console.log('update exitoso', ret),
        (err) => console.log('error', err)
      )
    }
    this.navCtrl.pop();
  }

  updateAvatar() {

    this.camera.takePicture('profile', 30);
    let diaryImageObsFirst = this.camera.imageData.take(1);
    let uploadObs = this.camera.uploadData.take(1);

    diaryImageObsFirst.subscribe(
      (imageData:any) => {
        let form = {localPath: imageData.localImage}
        this.profileData.updateProfileFan(form)
        .then( ret => {
          this.camera.toBlob(imageData.file)
        })
      },
      err => console.log('error en localImageObs second', err),
      () => console.log('termino localImageObs second')
    )

    uploadObs.subscribe( 
      (imageData: string) => {
        let form = {url: imageData}
        this.profileData.updateProfileFan(form);
        this.authData.setProfileData(this.profileForm.displayName || '', imageData)
        .then(
          (ret) => console.log('update exitoso', ret),
          (err) => console.log('error', err)
        )
      },
      err => console.log('error en webImageObs second', err),
      () => console.log('termino webImageObs second')
    )
  }

    // updateAvatarViejo() {
  //   this.camera.takePicture('profile');

  //   let localImageObs = this.camera.imageData.take(1);
  //   let webImageObs = this.camera.imageData.take(2).skip(1);

  //   localImageObs.subscribe(
  //     (imageData:any) => {
  //       let form = {localPath: imageData}
  //       this.profileData.updateProfileFan(form);
  //     },
  //     err => console.log('error en localImageObs second', err),
  //     () => console.log('termino localImageObs second')
  //   )

  //   webImageObs.subscribe(
  //     (imageData:any) => {
  //       let form = {url: imageData}
  //       this.profileData.updateProfileFan(form);
  //       this.authData.setProfileData(this.profileForm.displayName || '', imageData)
  //       .then(
  //         (ret) => console.log('update exitoso', ret),
  //         (err) => console.log('error', err)
  //       )
  //     },
  //     err => console.log('error en webImageObs second', err),
  //     () => console.log('termino webImageObs second')
  //   )
  // }


}
