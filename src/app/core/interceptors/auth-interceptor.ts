import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { Observable, catchError, throwError, switchMap } from 'rxjs';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authreq = request;
    authreq = this.addTokenHeader(request, String(this.authService.getToken()));
    return next.handle(authreq).pipe(
      catchError((errordata: any) => {
        if (errordata.status === 401) {
          // refresh token logic
          return this.handleRefrehToken(request, next);
        }
        return throwError(() => errordata);
      })
    ) as Observable<HttpEvent<any>>;
  }

  private handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        this.authService.storeToken(data.Token);
        this.authService.storeRefreshToken(data.RefreshToken);
        return next.handle(this.addTokenHeader(request, data.Token))
      }),
      catchError(errodata => {
        this.authService.logOut();
        return throwError(() => errodata)
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }

}




