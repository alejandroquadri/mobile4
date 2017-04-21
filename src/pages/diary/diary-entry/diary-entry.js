var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import { AngularFire } from 'angularfire2';
// servicios
import { CameraService } from '../../../providers/camera-service';
import { DiaryData } from '../../../providers/diary-data';
var DiaryEntryComponent = (function () {
    function DiaryEntryComponent(camera, alertCtrl, diaryData, af) {
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.diaryData = diaryData;
        this.af = af;
        this.detail = new EventEmitter();
    }
    DiaryEntryComponent.prototype.goToDetail = function (meal) {
        this.detail.emit(meal);
    };
    DiaryEntryComponent.prototype.addText = function (key) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Que comiste?",
            inputs: [{
                    name: "meal",
                    placeholder: "Que comiste?",
                    value: this.mealInput.text || ''
                }],
            buttons: [
                { text: 'Cancelar' },
                { text: 'Guardar',
                    handler: function (data) {
                        if (key) {
                            _this.update('text', data.meal, key);
                        }
                        else {
                            _this.update('text', data.meal);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    DiaryEntryComponent.prototype.addPicture = function () {
        var _this = this;
        var localImages, webImages, key;
        if (this.mealInput.localImages) {
            localImages = this.mealInput.localImages;
        }
        else {
            localImages = [];
        }
        if (this.mealInput.webImages) {
            webImages = this.mealInput.webImages;
        }
        else {
            webImages = [];
        }
        this.camera.takePicture('diary', 30);
        var diaryImageObsFirst = this.camera.imageData.take(1);
        var diaryImageObsSecond = this.camera.imageData.take(2).skip(1);
        diaryImageObsFirst.subscribe(function (imageData) {
            localImages.push(imageData);
            _this.update('localImages', localImages)
                .then(function (ret) {
                console.log('key array', ret.key);
                key = ret.key;
                if (!_this.mealInput.text) {
                    _this.addText(key);
                }
            }, function (err) { return console.log('error', err); });
        }, function (err) { return console.log('error en diaryImageObs first', err); }, function () {
            console.log('termino diaryImageObs first');
        });
        diaryImageObsSecond.subscribe(function (imageData) {
            webImages.push(imageData);
            _this.update('webImages', webImages, key);
        }, function (err) { return console.log('error en diaryImageObs second', err); }, function () { return console.log('termino diaryImageObs second'); });
    };
    DiaryEntryComponent.prototype.update = function (prop, value, key) {
        var form = {
            state: 'pending',
            order: this.mealInput.order,
            meal: this.mealInput.meal
        };
        form[prop] = value;
        if (this.mealInput.$key || key) {
            console.log('existe');
            if (this.mealInput.$key) {
                key = this.mealInput.$key;
            }
            return this.diaryData.updateList(form, key, this.day.format("YYYYMMDD"));
        }
        else {
            console.log('no existe');
            return this.diaryData.pushEntry(form, this.day.format("YYYYMMDD"));
        }
    };
    return DiaryEntryComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DiaryEntryComponent.prototype, "day", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DiaryEntryComponent.prototype, "mealInput", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DiaryEntryComponent.prototype, "detail", void 0);
DiaryEntryComponent = __decorate([
    Component({
        selector: 'diary-entry',
        templateUrl: 'diary-entry.html'
    }),
    __metadata("design:paramtypes", [CameraService,
        AlertController,
        DiaryData,
        AngularFire])
], DiaryEntryComponent);
export { DiaryEntryComponent };
//# sourceMappingURL=diary-entry.js.map