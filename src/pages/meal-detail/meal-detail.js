var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { DiaryData } from '../../providers/diary-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';
var MealDetailPage = (function () {
    function MealDetailPage(navCtrl, navParams, diaryData, profileData, alertCtrl, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.diaryData = diaryData;
        this.profileData = profileData;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.mealParams = this.navParams.data;
        console.log(this.mealParams);
        this.meal = this.diaryData.getMeal(this.mealParams.date, this.mealParams.$key);
        this.meal.subscribe(function (data) { return _this.mealData = data; });
        this.profileData.profileObs.subscribe(function (profile) {
            _this.profile = profile;
        });
    }
    MealDetailPage.prototype.ionViewDidLoad = function () {
    };
    MealDetailPage.prototype.addPicture = function () {
        var _this = this;
        var localImages, webImages;
        if (this.mealData.localImages) {
            localImages = this.mealData.localImages;
        }
        else {
            localImages = [];
        }
        if (this.mealData.webImages) {
            webImages = this.mealData.webImages;
        }
        else {
            webImages = [];
        }
        this.camera.takePicture('diary', 30);
        var diaryImageObsFirst = this.camera.imageData.take(1);
        var diaryImageObsSecond = this.camera.imageData.take(2).skip(1);
        diaryImageObsFirst.subscribe(function (imageData) {
            localImages.push(imageData);
            _this.diaryData.updateList({ localImages: localImages }, _this.mealParams.$key, _this.mealParams.date)
                .then(function (ret) { return console.log('local image saved', ret); }, function (err) { return console.log('error', err); });
        }, function (err) { return console.log('error en diaryImageObs first', err); }, function () {
            console.log('termino diaryImageObs first');
        });
        diaryImageObsSecond.subscribe(function (imageData) {
            webImages.push(imageData);
            _this.diaryData.updateList({ webImages: webImages, state: 'pending' }, _this.mealParams.$key, _this.mealParams.date)
                .then(function (ret) { return console.log('web image saved', ret); }, function (err) { return console.log('error', err); });
        }, function (err) { return console.log('error en diaryImageObs second', err); }, function () { return console.log('termino diaryImageObs second'); });
    };
    MealDetailPage.prototype.editText = function () {
        var _this = this;
        console.log('edit');
        var alert = this.alertCtrl.create({
            message: "Que comiste?",
            inputs: [{
                    name: "meal",
                    placeholder: "Que comiste?",
                    value: this.mealData.text || ''
                }],
            buttons: [
                { text: 'Cancelar' },
                { text: 'Guardar',
                    handler: function (data) {
                        _this.diaryData.updateList({ text: data.meal, state: 'pending' }, _this.mealParams.$key, _this.mealParams.date)
                            .then(function () { return console.log('updated'); }, function (err) { return console.log('error', err); });
                    }
                }
            ]
        });
        alert.present();
    };
    MealDetailPage.prototype.sendReview = function () {
        var _this = this;
        console.log(this.txtChat.content);
        var form = {
            message: this.txtChat.content,
            name: this.profile.displayName,
            timestamp: moment().format(),
        };
        this.diaryData.pushReview(this.mealParams.date, this.mealParams.$key, form)
            .then(function (ret) {
            console.log('enviado', ret);
            _this.txtChat.content = '';
            _this.diaryData.updateList({ state: 'pending' }, _this.mealParams.$key, _this.mealParams.date);
        }, function (err) { return console.log('error al enviar mensaje', err); });
    };
    MealDetailPage.prototype.send = function (mes) {
        console.log(mes);
        this.txtChat.content = '';
    };
    MealDetailPage.prototype.addPciture = function () {
    };
    return MealDetailPage;
}());
__decorate([
    ViewChild('txtChat'),
    __metadata("design:type", Object)
], MealDetailPage.prototype, "txtChat", void 0);
MealDetailPage = __decorate([
    Component({
        selector: 'page-meal-detail',
        templateUrl: 'meal-detail.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        DiaryData,
        ProfileData,
        AlertController,
        CameraService])
], MealDetailPage);
export { MealDetailPage };
//# sourceMappingURL=meal-detail.js.map