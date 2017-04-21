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
import firebase from 'firebase';
var AuthData = (function () {
    function AuthData(af) {
        var _this = this;
        this.af = af;
        af.auth.subscribe(function (user) {
            if (user) {
                _this.fireAuth = user.auth;
                console.log(user);
            }
        });
    }
    AuthData.prototype.current = function () {
        return this.af.auth;
    };
    AuthData.prototype.loginUser = function (newEmail, newPassword) {
        return this.af.auth.login({ email: newEmail, password: newPassword });
    };
    // para esto uso el JS SDK, no esta disponible todavia en AF2
    AuthData.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    AuthData.prototype.logoutUser = function () {
        return this.af.auth.logout();
    };
    AuthData.prototype.signupUser = function (newEmail, newPassword) {
        var _this = this;
        return this.af.auth.createUser({ email: newEmail, password: newPassword })
            .then(function (newUser) {
            _this.af.database.object("/userProfile/" + newUser.uid)
                .set({ email: newEmail });
        });
    };
    AuthData.prototype.setProfileData = function (displayName, photoURL) {
        var form = {
            displayName: this.fireAuth.displayName,
            photoURL: this.fireAuth.photoURL
        };
        if (displayName) {
            form['displayName'] = displayName;
        }
        if (photoURL) {
            form['photoURL'] = photoURL;
        }
        return firebase.auth().currentUser.updateProfile(form);
    };
    return AuthData;
}());
AuthData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], AuthData);
export { AuthData };
//# sourceMappingURL=auth-data.js.map