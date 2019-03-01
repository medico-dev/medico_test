import { Component } from '@angular/core';
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

  test: string = 'mohammed';
  currentLang: string;
  clinicsData: Clinic[] = [];

  constructor(private translate: TranslateService, public navCtrl: NavController, public clinics: Clinics) {
    let tempURL = "clinics?params={%22lat%22:24.7050658,%22long%22:46.68488,%22dental%22:1,%22skin%22:1,%22insurance%22:0}";
    this.clinics.query(tempURL).subscribe((resp: any) => {
      console.log("moh clinics success: ", resp);
      if(resp.data){
        for(var i=0; i<resp.data.length; i++){
          this.clinicsData.push(new Clinic(resp.data[i]));
        }
        for(var i=0; i<resp.data.length; i++){
          this.clinicsData.push(new Clinic(resp.data[i]));
        }
        for(var i=0; i<resp.data.length; i++){
          this.clinicsData.push(new Clinic(resp.data[i]));
        }
        for(var i=0; i<resp.data.length; i++){
          this.clinicsData.push(new Clinic(resp.data[i]));
        }
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

  changeTest(){
    this.test = "abody";
  }
  getClinicImage(t){
    return "http://portal.medico-ar.com/uploads/"+t.profile
  }

  changeOfHeart(element){
    // console.log("moh changeOfHeart: ",$(element).attr("src"));
    // if($(element).attr("src").indexOf("empty") > -1){
    //   $(element).attr("src","assets/img/icons/icon-heart-filled.png");
    // } else {
    //   $(element).attr("src","assets/img/icons/icon-heart-empty.png");
    // }
  }

  logScrollStart(){
    console.log("\n\nScroll Started\n\n");
  }

  logScrolling(event){
    console.log("\n\nScrolling: \n\n", event);
  }

  logScrollEnd(){
    console.log("\n\nScroll Ended\n\n");
  }

}
