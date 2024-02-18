import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';
import { routes } from '@core/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  public routers: typeof routes = routes;
  path!: ActivatedRouteSnapshot;
  route!: ActivatedRouteSnapshot;

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate([this.routers.LOGIN]);
          return false;
        }
        return true;
      })
    );
  }
}
