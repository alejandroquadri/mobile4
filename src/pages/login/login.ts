import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

// servicios
import { AuthData } from '../../providers/auth-data';

// paginas
// import { SignupPage } from '../signup/signup';
// import { ResetPasswordPage } from '../reset-password/reset-password';

//validators
import { EmailValidator } from '../../shared/validators/email.validator';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public authData: AuthData,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {}

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        console.log('va a root');
        // this.loading.dismiss().catch(() => {})
        // this.navCtrl.setRoot(TabsPage);
        // lo de arriba lo saco porque la observable del appcomponent ya lo esta direccionando y poniendo
        // el root en tabs cuando el usuario de loguea
      }, error => {
        console.log('hubo un error');
        this.loading.dismiss()
        .then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        })
        .catch(() => {})
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
