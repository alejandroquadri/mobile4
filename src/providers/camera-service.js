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
import { ActionSheetController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
// firebase
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
// plugins
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
// providers
import { AuthData } from './auth-data';
var CameraService = (function () {
    function CameraService(asCtrl, af, authData, file, camera) {
        this.asCtrl = asCtrl;
        this.af = af;
        this.authData = authData;
        this.file = file;
        this.camera = camera;
        this.imageDataSubject = new Subject();
        this.imageData = this.imageDataSubject.asObservable();
        this.data = {};
        // prueba obs en config
        this.numberSubject = new BehaviorSubject(1);
        this.numberObs = this.numberSubject.asObservable();
    }
    CameraService.prototype.takePicture = function (path, quality) {
        this.path = path;
        this.quality = quality;
        this.openActionSheet();
    };
    // esta funcion es para poder dar el path correcto de la foto guardadad
    // en el dispositivo
    CameraService.prototype.pathForImage = function (img) {
        console.log('usa path con esta imagen', img);
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    CameraService.prototype.openActionSheet = function () {
        var _this = this;
        var actionSheet = this.asCtrl.create({
            buttons: [
                {
                    text: 'Sacar foto',
                    icon: 'camera',
                    handler: function () {
                        console.log('scacar foto');
                        _this.cam(1);
                    }
                }, {
                    text: 'Biblioteca',
                    icon: 'images',
                    handler: function () {
                        console.log('biblioteca');
                        _this.cam(0);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // take picture
    CameraService.prototype.cam = function (source) {
        var _this = this;
        // PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
        var options = {
            quality: this.quality || 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: source,
            allowEdit: true,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options)
            .then(function (imagePath) {
            console.log('saco foto', imagePath);
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
        }, function (err) {
            console.log('error en servicio takePicture', err);
            return err;
        });
    };
    // Copy the image to a local folder
    CameraService.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        console.log('arranca copyFileToLocalDir');
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
            .then(function (success) {
            console.log('copio correctamente');
            var localImage = _this.pathForImage(newFileName);
            console.log('imagen local', localImage);
            _this.imageDataSubject.next(localImage);
            _this.toBlob(newFileName);
        }, function (err) {
            console.log('Error en copyFileToLocalDir');
        });
    };
    // creates a FileName for storing
    CameraService.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // creates a Blob from the stored file to upload
    CameraService.prototype.toBlob = function (image) {
        var _this = this;
        console.log('arranca toBlob');
        this.file.readAsArrayBuffer(cordova.file.dataDirectory, image)
            .then(function (success) {
            var blob = new Blob([success], { type: 'image/jpeg' });
            _this.uploadImage(blob);
        }, function (error) {
            console.error(error);
        });
    };
    // uploads image
    CameraService.prototype.uploadImage = function (image) {
        var _this = this;
        console.log('arranca uploadImage2', JSON.stringify(image));
        var imageName = this.createFileName();
        console.log('auth', this.authData.fireAuth.uid);
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(this.authData.fireAuth.uid + "/images/" + this.path).child(imageName).put(image);
        uploadTask.on('state_changed', function (snapshot) {
            console.log(snapshot);
        }, function (error) {
            console.error(error);
        }, function () {
            var downloadURL = uploadTask.snapshot.downloadURL;
            _this.imageDataSubject.next(downloadURL);
        });
    };
    CameraService.prototype.addOne = function () {
        this.numberSubject.next(1);
    };
    return CameraService;
}());
CameraService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ActionSheetController,
        AngularFire,
        AuthData,
        File,
        Camera])
], CameraService);
export { CameraService };
//# sourceMappingURL=camera-service.js.map