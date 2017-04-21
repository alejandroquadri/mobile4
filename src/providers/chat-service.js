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
var ChatService = (function () {
    function ChatService(af) {
        this.af = af;
        console.log('Hello ChatService Provider');
    }
    ChatService.prototype.getChat = function (chatUid) {
        return this.af.database.list("/chats/" + chatUid);
    };
    ChatService.prototype.pushMsg = function (chatUid, msg) {
        return this.af.database.list("/chats/" + chatUid)
            .push(msg);
    };
    ChatService.prototype.updateMsg = function (chatUid, msg, newMsg) {
        return this.af.database.list("/chats/" + chatUid)
            .update(msg, newMsg);
    };
    ChatService.prototype.removeMsg = function (chatUid, msg) {
        return this.af.database.list("/chats/" + chatUid)
            .remove(msg);
    };
    ChatService.prototype.mesRead = function (chatUid, author) {
        var _this = this;
        this.offCheckRead();
        this.chat = firebase.database().ref("/chats/" + chatUid);
        this.chat.on('child_added', function (data) {
            if (author !== data.val().uid) {
                _this.chat.child(data.key).update({ read: true })
                    .then(function () { return console.log('updated'); }, function (err) { return console.log('error'); });
            }
        });
    };
    ChatService.prototype.getChatFireSDK = function (chatUid) {
        console.log(chatUid);
        firebase.database().ref("/chats/" + chatUid)
            .on('value', function (data) { return console.log(data.val()); });
    };
    ChatService.prototype.offCheckRead = function () {
        if (this.chat) {
            console.log('check msj read off');
            this.chat.off();
        }
    };
    return ChatService;
}());
ChatService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], ChatService);
export { ChatService };
//# sourceMappingURL=chat-service.js.map