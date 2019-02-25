import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    if (this.account.username == "" || this.account.username == null) {
      alert('Please check your credentials!');
      this.navCtrl.push(MainPage);
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
        this.navCtrl.push(MainPage);
      }, (err) => {
        this.navCtrl.push(MainPage);
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


  // $scope.gotohome = function(){
  //   var signinArray = JSON.stringify($scope.data);
  //   var url = RESOURCES.baseurl+'/login-customer?params='+signinArray;
  //   console.log(url);
	// 	if ($scope.data.username == "" || $scope.data.username == null) {
	// 		alert('Please check your credentials!');
	// 	}else if ($scope.data.username.length == 0) {
	// 		alert('Please check your credentials!');
	// 	}else if($scope.data.password == "" || $scope.data.password == null){
	// 	   alert('Please check your credentials!');
	// 	}else if($scope.data.password.length == 0){
	// 	   alert('Please check your credentials!');
	// 	}else{
	// 		AppLevelService.GetResponseData(url).success(function(data) {
	// 			if(data.response == 1){
  //         console.log(data);
  //         if(data.data[0].status == 1){
  //           $rootScope.updateUser(data.data[0], data.token);
  //           $rootScope.showMsg("success", $rootScope.lang.messages.signinSuccess, 'app.clinics');
  //           $rootScope.pushFuncReg();
  //         }else{
  //           $rootScope.tempUser = data.data[0];
  //           console.log("Temp User:",$rootScope.tempUser);
  //           $rootScope.showMsg("success", $rootScope.lang.messages.signinSuccess, 'app.confirmEmail');
  //         }
	// 			}
	// 		}).error(function(data) {
  //       $rootScope.showMsg("error", data, "");
	// 		});
	// 	}
  // }


}
