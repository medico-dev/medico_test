import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ClinicsListPage } from './clinics-list';

@NgModule({
  declarations: [
    ClinicsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicsListPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClinicsListPage
  ]
})
export class ClinicsListPageModule { }
