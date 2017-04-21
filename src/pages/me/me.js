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
import { NavController } from 'ionic-angular';
// paginas
import { ProfilePage } from '../profile/profile';
import { ProgressPage } from '../progress/progress';
import { CoachPage } from '../coach/coach';
// providers
var MePage = (function () {
    function MePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.avatar = "./assets/images/smiley-cyrus.jpg";
    }
    MePage.prototype.ionViewDidLoad = function () {
    };
    MePage.prototype.goToProfile = function () {
        this.navCtrl.push(ProfilePage);
    };
    MePage.prototype.goToProgress = function () {
        this.navCtrl.push(ProgressPage);
    };
    MePage.prototype.goToCoach = function () {
        this.navCtrl.push(CoachPage);
    };
    return MePage;
}());
MePage = __decorate([
    Component({
        selector: 'page-me',
        templateUrl: 'me.html'
    }),
    __metadata("design:paramtypes", [NavController])
], MePage);
export { MePage };
//# sourceMappingURL=me.js.map