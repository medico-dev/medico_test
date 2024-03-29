import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

import { FirstRunPage, ClinicsListPage, LoginPage } from '../pages';
import { Settings, User } from '../providers';

@Component({
  selector: 'page-clinics-list',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  currentLang: string;
  user: User;
  menuSide: string;
  myPlatform: Platform;
  showSplash = true; // <-- show animation

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, user: User, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.user = user;
    this.user.load().then( (result) => {
        if(result == "success"){
          this.rootPage = ClinicsListPage;
        } else {
          this.rootPage = FirstRunPage;
        }
      }, (reason) => {
        this.rootPage = FirstRunPage;
      }
    );
    platform.ready().then(() => {
      // Okay, so the platform is readsy and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(2500).subscribe(() => this.showSplash = false);
    });
    this.myPlatform = platform;
    this.initTranslate();
    this.currentLang = this.translate.currentLang;
    this.updateMenuSide();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        //this.translate.use(this.translate.getBrowserLang());{
        this.translate.use('ar');
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.updateMenuSide();
    });
  }

  updateMenuSide() {
    console.log("moh menuCtrl: ",this.menuCtrl);
    if(this.currentLang === "ar"){
      this.myPlatform.setDir('rtl', true);
      this.menuCtrl.enable(false, 'left');
      this.menuCtrl.enable(true, 'right');
    }else{
      this.myPlatform.setDir('ltr', true);
      this.menuCtrl.enable(true, 'left');
      this.menuCtrl.enable(false, 'right');
    }
  }

  changeLang(){
    if(this.currentLang === "ar"){
      this.translate.use('en');
    }else{
      this.translate.use('ar');
    }
  }

  logout(){
    this.user.logout().then( (resutl) => {
      this.nav.setRoot(LoginPage);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
