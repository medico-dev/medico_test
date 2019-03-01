import { Injectable } from '@angular/core';

import { Clinic } from '../../models/clinic';
import { Api } from '../api/api';

@Injectable()
export class Clinics {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('clinics?params={%22lat%22:24.7050658,%22long%22:46.68488,%22dental%22:1,%22skin%22:1,%22insurance%22:0}', params).share();
  }

  add(clinic: Clinic) {
  }

  delete(clinic: Clinic) {
  }

}
