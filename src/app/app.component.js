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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { AngularFire } from 'angularfire2';
// paginas
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
var MyApp = (function () {
    function MyApp(platform, af, statusBar, splashScreen, keyboard) {
        var _this = this;
        this.platform = platform;
        this.keyboard = keyboard;
        af.auth.subscribe(function (user) {
            if (user) {
                console.log('va al root');
                _this.rootPage = TabsPage;
            }
            else {
                console.log('va al login');
                _this.rootPage = LoginPage;
            }
        });
        this.platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            keyboard.onKeyboardShow().subscribe(function () {
                document.body.classList.add('keyboard-is-open');
            });
            keyboard.onKeyboardHide().subscribe(function () {
                document.body.classList.remove('keyboard-is-open');
            });
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Component({
        template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
    }),
    __metadata("design:paramtypes", [Platform,
        AngularFire,
        StatusBar,
        SplashScreen,
        Keyboard])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map