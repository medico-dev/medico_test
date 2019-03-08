import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  _userToken: any;
  storage: Storage;
  private USER_TOKEN_KEY: string = '_userToken';
  private USER_OBJECT_KEY: string = '_userObject';

  constructor(public api: Api, storage: Storage) {
    this.storage = storage
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    var signinArray = JSON.stringify(accountInfo);
    let seq = this.api.post('login-customer?params='+signinArray, accountInfo, { headers: {
                        'Authorization': 'Bearer ' + undefined
                    }}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.response === 1) {
        if (res.token != undefined) {
          this._loggedIn(res);
        } else {
          console.error('ERROR No Token', res);
        }
      } else {
        console.error('Response ERROR', res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this._userToken = null;
    this.storage.remove(this.USER_OBJECT_KEY);
    return this.storage.remove(this.USER_TOKEN_KEY);
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.data[0];
    this._userToken = resp.token;
    this.save(this.USER_OBJECT_KEY, this._user);
    this.save(this.USER_TOKEN_KEY, this._userToken);
  }

  save(key: string ,value: any) {
    this.storage.set(key, value).then((result) => {
      console.log(`Successfully saved item to storage:\nKey: ${key} \nValue: `,value, result);
    }, (reason) => {
      console.log(`Failed when saving item to storage:\nKey: ${key} \nValue: `,value, reason);
    });
  }

  load() {
    console.log("loading user");
    return this.storage.get(this.USER_TOKEN_KEY).then((value) => {
      if (value) {
        //  this.token = value;
        this._userToken = value;
        console.log("loaded token is: ", value);
        this.storage.get(this.USER_OBJECT_KEY).then((value) => {
          this._user = value;
          console.log("loaded user object is: ", value);
        }, (reason) => {
          console.log("Failed loading user object: ", reason);
        });
        return "success";//this._mergeDefaults(this._defaults);
      } else {
        console.log("loaded token empty is: ", value);
        return  "failed";//
      }
    }, (reason) => {
      console.log("Failed loading user token: ", reason);
    } );
  }
}
