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
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavController } from 'ionic-angular';
// import 'rxjs/add/operator/take';
import { CameraService } from '../../providers/camera-service';
var ConfigPage = (function () {
    function ConfigPage(navCtrl, camera) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        // numberSubject = new BehaviorSubject(1);
        // numberObs = this.numberSubject.asObservable();
        this.value = 0;
    }
    ConfigPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var obsConfig = this.camera.numberObs.take(3);
        obsConfig.subscribe(function (valor) {
            console.log('va a sumar', valor);
            _this.value = _this.value + valor;
        }, function (err) { return console.log('error', err); }, function () { return console.log('termino'); });
    };
    ConfigPage.prototype.add = function () {
        // this.numberSubject.next(1);
        this.camera.addOne();
    };
    return ConfigPage;
}());
ConfigPage = __decorate([
    Component({
        selector: 'page-config',
        templateUrl: 'config.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CameraService])
], ConfigPage);
export { ConfigPage };
//# sourceMappingURL=config.js.map