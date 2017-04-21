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
import * as moment from 'moment';
// pages
import { MealDetailPage } from '../meal-detail/meal-detail';
// servicios
import { DiaryData } from '../../providers/diary-data';
// pipes
import { SortAddPipe } from '../../shared/pipes/sort-add.pipe';
import { ObjectToArrayPipe } from '../../shared/pipes/object-to-array.pipe';
var DiaryPage = (function () {
    function DiaryPage(navCtrl, loadingCtrl, diaryData, sortAddPipe, objectToArray) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.diaryData = diaryData;
        this.sortAddPipe = sortAddPipe;
        this.objectToArray = objectToArray;
        this.day = moment();
        this.getData();
    }
    DiaryPage.prototype.ionViewDidLoad = function () {
    };
    DiaryPage.prototype.getData = function () {
        var _this = this;
        this.diaryData.getDiary()
            .subscribe(function (data) {
            _this.completeDiary = data;
            _this.diary = _this.dateDiary();
        });
    };
    DiaryPage.prototype.setDay = function (day) {
        this.day = day.date;
        this.diary = this.dateDiary();
    };
    DiaryPage.prototype.detail = function (meal) {
        meal['date'] = this.day.format("YYYYMMDD");
        this.navCtrl.push(MealDetailPage, meal);
    };
    DiaryPage.prototype.dateDiary = function () {
        var dayDiary = this.completeDiary[this.day.format("YYYYMMDD")];
        if (!dayDiary) {
            dayDiary = [];
        }
        var primero = this.objectToArray.transform(dayDiary);
        var segundo = this.sortAddPipe.transform(primero, 'order', true);
        return segundo;
    };
    return DiaryPage;
}());
DiaryPage = __decorate([
    Component({
        selector: 'page-diary',
        templateUrl: 'diary.html',
    }),
    __metadata("design:paramtypes", [NavController,
        LoadingController,
        DiaryData,
        SortAddPipe,
        ObjectToArrayPipe])
], DiaryPage);
export { DiaryPage };
//# sourceMappingURL=diary.js.map