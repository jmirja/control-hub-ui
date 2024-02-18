import { Injectable } from '@angular/core';

import { CoreApiService } from '../services/core-api.service';
import { TokenStorageService } from './token-storage.service';
import { LogService } from '../services/log.service';
import { IRequestUserRegister } from '../models/request/IRequestUserRegister';
import { IRequestUserLogin } from '../models/request/IRequestUserLogin';
import { BehaviorSubject, Subject, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { routes } from '@core/constants';
import { IToken } from '@core/models';
import { IRequestUserResetPassword } from '@core/models/request/IRequestUserResetPassword';
import { IRequestUserVerifyEmail } from '@core/models/request/IRequestUserVerifyEmail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private registeredIn = new BehaviorSubject<boolean>(false);

  public userSubject = new Subject<string>();
  public user: string = '';
  public routers: typeof routes = routes;

  constructor(
    private coreApiService: CoreApiService,
    private tokenService: TokenStorageService,
    private logService: LogService,
    private router: Router
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isRegisteredIn() {
    return this.registeredIn.asObservable();
  }

  storeToken(token: string) {
    this.tokenService.setJwtToken(token);
  }

  getToken() {
    this.tokenService.getJwtToken();
  }

  storeRefreshToken(token: string) {
    this.tokenService.setRefreshToken(token);
  }

  getRefreshToken() {
    this.tokenService.getRefreshToken();
  }

  generateRefreshToken() {
    let request: IToken = {
      Token: this.tokenService.getJwtToken(),
      RefreshToken: this.tokenService.getRefreshToken(),
    }
    return this.coreApiService.generateRefreshToken(request).then((token: IToken) => {
      return of(token);
    });
  }

  logOut() {
    this.tokenService.removeLocalStorage();
    this.loggedIn.next(false);
  }

  getUser(): string {
    return this.user;
  }

  register(request: IRequestUserRegister) {
    return this.coreApiService
      .register(request)
      .then((result: any) => {
        if (result) {
          this.registeredIn.next(true);
        }
        return result;
      })
      .catch((err: any) => { });
  }

  login(request: IRequestUserLogin) {
    return this.coreApiService
      .login(request)
      .then((result: any) => {
        if (result.IsSuccess) {
          this.storeToken(result.Data.Token);
          this.storeRefreshToken(result.Data.RefreshToken);
          this.user = request.UserName;
          this.userSubject.next(this.user);
          this.loggedIn.next(true);
        }
        else {
          throwError(() => 'login failed')
        }
        return result;
      })
      .catch((err: any) => { });
  }

  forgotPassword(request: string) {
    return this.coreApiService
      .forgotPassword(request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return err;
       });
  }

  resetPassword(request: IRequestUserResetPassword) {
    return this.coreApiService
      .resetPassword(request)
      .then((result: any) => {
        if (result) {
          this.registeredIn.next(true);
        }
        return result;
      })
      .catch((err: any) => { });
  }

  verifyEmail(request: IRequestUserVerifyEmail) {
    return this.coreApiService
      .verifyEmail(request)
      .then((result: any) => {
        if (result) {
          this.registeredIn.next(true);
        }
        return result;
      })
      .catch((err: any) => { });
  }

}
