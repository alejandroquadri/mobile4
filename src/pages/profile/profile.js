var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
// pages
import { LoginPage } from '../login/login';
// clases
import { ProfileForm } from './profileForm';
// servicios
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';
var ProfilePage = (function () {
    function ProfilePage(navCtrl, authData, profileData, camera, af, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.profileData = profileData;
        this.camera = camera;
        this.af = af;
        this.loadingCtrl = loadingCtrl;
        this.avatar = "./assets/images/smiley-cyrus.jpg";
        this.profileForm = new ProfileForm;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileData.setProfile();
        this.profileData.profileObs
            .subscribe(function (data) {
            console.log('actualiza', data);
            _this.profileForm = data;
        });
    };
    ProfilePage.prototype.logOut = function () {
        var _this = this;
        this.authData.logoutUser()
            .then(function (ret) {
            console.log('user unlogged', ret);
            // this.navCtrl.pop()
            _this.navCtrl.setRoot(LoginPage);
            // this.navCtrl.push(LoginPage);
        }, function (err) { return console.log('error', err); });
    };
    ProfilePage.prototype.updateUser = function () {
        console.log('update user', this.profileForm);
        var updateProfile = {
            firstName: this.profileForm.firstName || '',
            lastName: this.profileForm.lastName || '',
            bio: this.profileForm.bio || '',
            displayName: this.profileForm.displayName || '',
            birthDate: this.profileForm.birthDate || '',
        };
        console.log('form a actualizar', updateProfile);
        this.profileData.updateProfile(updateProfile);
        if (this.profileForm.displayName) {
            this.authData.setProfileData(this.profileForm.displayName)
                .then(function (ret) { return console.log('update exitoso', ret); }, function (err) { return console.log('error', err); });
        }
    };
    ProfilePage.prototype.updateAvatar = function () {
        var _this = this;
        this.camera.takePicture('profile');
        var localImageObs = this.camera.imageData.take(1);
        var webImageObs = this.camera.imageData.take(2).skip(1);
        localImageObs.subscribe(function (imageData) {
            var form = { localPath: imageData };
            _this.profileData.updateProfile(form);
        }, function (err) { return console.log('error en localImageObs second', err); }, function () { return console.log('termino localImageObs second'); });
        webImageObs.subscribe(function (imageData) {
            var form = { url: imageData };
            _this.profileData.updateProfile(form);
            _this.authData.setProfileData(_this.profileForm.displayName || '', imageData)
                .then(function (ret) { return console.log('update exitoso', ret); }, function (err) { return console.log('error', err); });
        }, function (err) { return console.log('error en webImageObs second', err); }, function () { return console.log('termino webImageObs second'); });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AuthData,
        ProfileData,
        CameraService,
        AngularFire,
        LoadingController])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map