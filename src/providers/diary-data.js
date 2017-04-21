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
import 'rxjs/add/operator/map';
import { AuthData } from './auth-data';
var DiaryData = (function () {
    function DiaryData(af, authData) {
        this.af = af;
        this.authData = authData;
    }
    DiaryData.prototype.getDiary = function () {
        return this.af.database.object("/diary/" + this.authData.fireAuth.uid);
    };
    DiaryData.prototype.updateList = function (form, key, day) {
        return this.af.database.list("/diary/" + this.authData.fireAuth.uid + "/" + day)
            .update(key, form);
    };
    DiaryData.prototype.pushEntry = function (form, day) {
        console.log('entra', form, day);
        return this.af.database.list("/diary/" + this.authData.fireAuth.uid + "/" + day)
            .push(form);
    };
    DiaryData.prototype.getMeal = function (day, array) {
        return this.af.database.object("/diary/" + this.authData.fireAuth.uid + "/" + day + "/" + array);
    };
    DiaryData.prototype.pushReview = function (day, array, review) {
        return this.af.database.list("/diary/" + this.authData.fireAuth.uid + "/" + day + "/" + array + "/reviews")
            .push(review);
    };
    return DiaryData;
}());
DiaryData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire,
        AuthData])
], DiaryData);
export { DiaryData };
//# sourceMappingURL=diary-data.js.map