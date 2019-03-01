import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { ClinicsListPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: 'testing@gmail.com',
    password: '123456'
  };

  // Our translated text strings
  private loginErrorString: string;
  private isArabic: boolean;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.isArabic = true;
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    if (this.account.username == "" || this.account.username == null) {
      alert('Please check your credentials!');
      this.navCtrl.push(ClinicsListPage);
      var t = this.loginErrorString;
    }else if (this.account.username.length == 0) {
      alert('Please check your username!');
    }else if(this.account.password == "" || this.account.password == null){
       alert('Please check your password!');
    }else if(this.account.password.length == 0){
       alert('Please check your password length!');
    }else{
      this.user.login(this.account).subscribe((resp) => {
        console.log("moh logged in: ", resp);
        this.navCtrl.setRoot(ClinicsListPage);
      }, (err) => {
        //this.navCtrl.push(ClinicsListPage);
        // Unable to log in
        console.log("moh err: ",err);
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 120000,
          position: 'top'
        });
        toast.present();
      });
    }
  }

  skipLogin() {
    this.navCtrl.push(ClinicsListPage);
  }

  changeLanguage() {
    if(this.translateService.currentLang === "ar")
      this.translateService.use('en');
    else
      this.translateService.use('ar');
  }
}
