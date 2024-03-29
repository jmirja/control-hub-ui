import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1), catchError(this.showSnackBar));
  }

  private showSnackBar = (response: HttpErrorResponse): Observable<any> => {
    const text = `Error Message: ${response.message}`;
    if (text) {
      this.snackBar.open(text, 'Close', { duration: 7000 });
    }
    return throwError(() => response);
  };
}
