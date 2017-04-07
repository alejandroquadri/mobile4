import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// firebase
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

// plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

// providers
import { AuthData } from './auth-data';

declare var cordova: any;


@Injectable()
export class CameraService {

  public storage: any;
  public imageDataSubject = new Subject();
  public imageData = this.imageDataSubject.asObservable();
  public data = {};
  public path;
  private quality: number;

  constructor(
    public asCtrl: ActionSheetController,
    public af: AngularFire,
    public authData: AuthData,
    private file: File,
    private camera: Camera,
  ) {}

  takePicture(path, quality?: number) {
    this.path = path;
    this.quality = quality;
    this.openActionSheet()
  }

  // esta funcion es para poder dar el path correcto de la foto guardadad
  // en el dispositivo
  pathForImage(img) {
    console.log('usa path con esta imagen', img);
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  openActionSheet() {
    let actionSheet = this.asCtrl.create(
      {
      buttons: [
        {
          text: 'Sacar foto',
          icon: 'camera',
          handler: () => {
            console.log('scacar foto');
            this.cam(1);
          }
        },{
          text: 'Biblioteca',
          icon: 'images',
          handler: () => {
            console.log('biblioteca');
            this.cam(0);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // take picture
  private cam(source) {
    // PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
    const options: CameraOptions = {
      quality: this.quality  || 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options)
    .then((imagePath) => {
      console.log('saco foto', imagePath);
      let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }, (err) => {
      console.log('error en servicio takePicture', err);
      return err;
    })
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log('arranca copyFileToLocalDir')
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
    .then((success) => {
      console.log('copio correctamente')
      let localImage = this.pathForImage(newFileName);
      console.log('imagen local', localImage);
      this.imageDataSubject.next(localImage);

      this.toBlob(newFileName)
    }, (err) => {
      console.log('Error en copyFileToLocalDir');
    });
  }

  // creates a FileName for storing
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // creates a Blob from the stored file to upload
  private toBlob(image) {
    console.log('arranca toBlob');
    this.file.readAsArrayBuffer(cordova.file.dataDirectory, image)
    .then( (success) => {
        var blob = new Blob([success], {type: 'image/jpeg'});
        this.uploadImage(blob);
    }, (error) => {
        console.error(error);
    })
  }

  // uploads image
  private uploadImage (image){
    console.log('arranca uploadImage2', JSON.stringify(image));
    let imageName = this.createFileName();
    console.log('auth', this.authData.fireAuth.uid);
    let storageRef = firebase.storage().ref()
    let uploadTask = storageRef.child(`${this.authData.fireAuth.uid}/images/${this.path}`).child(imageName).put(image)

    uploadTask.on('state_changed', (snapshot) => {
        console.info(snapshot);
    }, (error) => {
        console.error(error);
    }, () => {
        let downloadURL = uploadTask.snapshot.downloadURL;
        this.imageDataSubject.next(downloadURL);
    })
  }

  // prueba obs en config
  numberSubject = new BehaviorSubject(1);
  numberObs = this.numberSubject.asObservable();

  addOne(){
    this.numberSubject.next(1);
  }
  // fin prueba

}
