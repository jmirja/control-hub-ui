import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IRequestUserLogin } from '../models/request/IRequestUserLogin';
import { IRequestUserRegister } from '../models/request/IRequestUserRegister';
import { IToken } from '@core/models';
import { catchError, map } from 'rxjs';
import { IRequestUserResetPassword } from '@core/models/request/IRequestUserResetPassword';
import { IRequestUserVerifyEmail } from '@core/models/request/IRequestUserVerifyEmail';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getRequestToAPI(method: string, param: any): any {
    let path = this.getMethodCategory(method) + '/' + method;

    // Append param as query string if it exists
    if (param) {
      // Convert param to query string
      const queryString = Object.keys(param)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(param[key]))
        .join('&');

      // Append query string to the path
      path += '?' + queryString;
    }

    return this.http
      .get(this.url + path)
      .toPromise()
      .then((data: any) => {
        try {
          return data;
        } catch (error) {
          return null;
        }
      });

  }

  postRequestToAPI(method: string, param: any): any {
    let path = this.getMethodCategory(method) + '/' + method;
    let body = null;
    let params = null;

    if (param) {
      if (typeof param === 'string') {
        path += '?' + param;
      } else if (typeof param === 'object') {
        body = JSON.stringify(param);;
      }
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

  getMethodCategory(method: string): string {
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

  generateRefreshToken(request: IToken) {
    return this.postRequestToAPI('Refresh', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  verifyEmail(request: IRequestUserVerifyEmail) {
    return this.getRequestToAPI('VerifyEmail', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  forgotPassword(email: string) {
    return this.postRequestToAPI('ForgotPassword', email)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

  resetPassword(request: IRequestUserResetPassword) {
    return this.getRequestToAPI('ResetPassword', request)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        return null;
      });
  }

}
