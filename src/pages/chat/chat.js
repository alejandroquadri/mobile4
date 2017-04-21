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
import { NavController } from 'ionic-angular';
import { AngularFire, } from 'angularfire2';
import * as moment from 'moment';
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { ChatService } from '../../providers/chat-service';
var ChatPage = (function () {
    function ChatPage(navCtrl, af, authData, profileData, chatService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.af = af;
        this.authData = authData;
        this.profileData = profileData;
        this.chatService = chatService;
        this.profile = this.profileData.profileObs;
        this.profile.subscribe(function (profile) {
            _this.profileObject = profile;
            _this.profileData.coachProfile(profile.coach).subscribe(function (coach) {
                _this.coachProfile = coach;
            });
            _this.chatUid = _this.profileObject.coach + "&" + _this.authData.fireAuth.uid;
            _this.chat = _this.chatService.getChat(_this.chatUid);
            _this.chatService.mesRead(_this.chatUid, _this.profileObject.$key);
            _this.chatService.getChatFireSDK(_this.chatUid);
        });
    }
    ChatPage.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        this.chatUid = this.profileObject.coach + "&" + this.authData.fireAuth.uid;
        this.chat = this.chatService.getChat(this.chatUid);
        this.chatService.mesRead(this.chatUid, this.profileObject.$key);
    };
    ChatPage.prototype.ionViewDidLeave = function () {
        this.chatService.offCheckRead();
    };
    ChatPage.prototype.scrollToBottom = function () {
        this.chatUi.scrollToBottom(300);
    };
    ChatPage.prototype.send = function () {
        var _this = this;
        if (this.txtChat.content !== '') {
            var form = {
                content: this.txtChat.content,
                uid: this.profileObject.$key,
                read: false,
                displayName: this.profileObject.displayName,
                timestamp: moment().format(),
            };
            this.chatService.pushMsg(this.chatUid, form)
                .then(function (ret) {
                console.log('msg sent', ret);
                _this.txtChat.content = '';
            }, function (err) { return console.log('error', err); });
        }
    };
    return ChatPage;
}());
__decorate([
    ViewChild('txtChat'),
    __metadata("design:type", Object)
], ChatPage.prototype, "txtChat", void 0);
__decorate([
    ViewChild('chatUi'),
    __metadata("design:type", Object)
], ChatPage.prototype, "chatUi", void 0);
ChatPage = __decorate([
    Component({
        selector: 'page-chat',
        templateUrl: 'chat.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AngularFire,
        AuthData,
        ProfileData,
        ChatService])
], ChatPage);
export { ChatPage };
//# sourceMappingURL=chat.js.map