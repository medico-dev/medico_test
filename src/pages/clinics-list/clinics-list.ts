import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Clinic } from '../../models/clinic';
import { Clinics } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-clinics-list',
  templateUrl: 'clinics-list.html'
})
export class ClinicsListPage {

  isScrolledClass: string = "content-not-scrolled";
  currentLang: string;
  clinicsData: Clinic[] = [];

  constructor(public zone: NgZone, private translate: TranslateService, public navCtrl: NavController, public clinics: Clinics) {
    let tempURL = "clinics?params={%22lat%22:24.7050658,%22long%22:46.68488,%22dental%22:1,%22skin%22:1,%22insurance%22:0}";
    this.clinics.query(tempURL).subscribe((resp: any) => {
      console.log("moh clinics success: ", resp);
      if(resp.data){
        for(var i=0; i<resp.data.length; i++){
          this.clinicsData.push(new Clinic(resp.data[i]));
        }
        console.log("mohammed clinicsData: ",navCtrl);
      }
    }, (err: any) => {
      console.log("moh clinics error: ", err);
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  getClinicImage(t){
    return "http://portal.medico-ar.com/uploads/"+t.profile
  }

  changeOfHeart(element){
     console.log("moh changeOfHeart: ",element.src);
      //element.src = "assets/img/icons/icon-heart-filled.png";
    if(element.src.indexOf("empty") > -1){
      element.src = "assets/img/icons/icon-heart-filled.png";
    } else {
      element.src = "assets/img/icons/icon-heart-empty.png";
    }
  }

  logScrollStart(){
    //console.log("\n\nScroll Started\n\n");
  }

  logScrolling(event){
    //console.log("\n\nScrolling: \n\n", event);
    this.zone.run(() => {
          if(event.scrollTop >= 15) {
            this.isScrolledClass = "content-scrolled";
          } else {
            this.isScrolledClass = "content-not-scrolled";
          }
        });
  }

  logScrollEnd(){
    //console.log("\n\nScroll Ended\n\n");
  }

}
