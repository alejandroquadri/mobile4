var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import { AuthData } from './auth-data';
var ProfileData = (function () {
    function ProfileData(af, authData) {
        var _this = this;
        this.af = af;
        this.authData = authData;
        this.setProfile();
        this.profileObs.subscribe(function (data) {
            _this.current = data;
        });
    }
    ProfileData.prototype.updateProfile = function (form) {
        this.af.database.object("/userProfile/" + this.authData.fireAuth.uid)
            .update(form);
    };
    ProfileData.prototype.setProfile = function () {
        this.profileObs = this.af.database.object("/userProfile/" + this.authData.fireAuth.uid);
    };
    ProfileData.prototype.coachProfile = function (coachuid) {
        return this.af.database.object("coachProfile/" + coachuid);
    };
    ProfileData.prototype.getProfileOnce = function () {
        return firebase.database().ref("/userProfile/" + firebase.auth().currentUser.uid).once('value');
    };
    return ProfileData;
}());
ProfileData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire,
        AuthData])
], ProfileData);
export { ProfileData };
//# sourceMappingURL=profile-data.js.map