import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestUserLogin } from '../models/request/IRequestUserLogin';
import { IRequestUserRegister } from '../models/request/IRequestUserRegister';
import { IRequestUserResetPassword } from '@core/models/request/IRequestUserResetPassword';
import { IRequestUserVerifyEmail } from '@core/models/request/IRequestUserVerifyEmail';
import { IRequestUserForgotPassword } from '@core/models/request/IRequestUserForgotPassword';
import { IRequestUserToken } from '@core/models/request/IRequestUserToken';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getRequestToAPI(method: string, body?: any, options?: any): any {
    let path = this.getMethodCategory(method) + '/' + method;

    if (options) {
      path = `${this.appendAsQueryString(options)}`
    }

    return this.http
      .get(this.url + path, body)
      .toPromise()
      .then((data: any) => {
        try {
          return data;
        } catch (error) {
          return null;
        }
      });

  }


  private postRequestToAPI(method: string, body?: any, options?: any): any {
    let path = this.getMethodCategory(method) + '/' + method;

    if (options) {
      path += `${this.appendAsQueryString(options)}`
    }

    return this.http
      .post(this.url + path, body)
      .toPromise()
      .then((data: any) => {
        try {
          return data;
        } catch (error) {
          return null;
        }
      });
  }

  private appendAsQueryString(model: any) {
    const queryString = Object.keys(model)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(model[key]))
      .join('&');
    return '?' + queryString;
  }

  private getMethodCategory(method: string): string {
    let category: string = '';
    switch (method) {
      case 'Register':
      case 'Login':
      case 'Refresh':
      case 'VerifyEmail':
      case 'ForgotPassword':
      case 'ResetPassword':
        category = 'UserAccess';
        break;
      case 'Send':
        category = 'Email';
        break;
    }
    return category;
  }

  register(request: IRequestUserRegister) {
    if (request == null) return null;
    return this.postRequestToAPI('Register', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  login(request: IRequestUserLogin) {
    if (request == null) return null;
    return this.postRequestToAPI('Login', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  generateRefreshToken(request: IRequestUserToken) {
    return this.postRequestToAPI('Refresh', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  verifyEmail(request: IRequestUserVerifyEmail) {
    return this.postRequestToAPI('VerifyEmail', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  forgotPassword(request: IRequestUserForgotPassword) {
    return this.postRequestToAPI('ForgotPassword', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  resetPassword(request: IRequestUserResetPassword) {
    return this.postRequestToAPI('ResetPassword', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

}
