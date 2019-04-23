import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  env = this.appComponent.env;

  constructor(private auth: AuthService,
              private myRoute: Router,
              private appComponent: AppComponent) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('In Auth guard - Call from: ' + state.url);
    return this.auth.loggedIn(this.env.apiUrl).then(isAuth => {
        if (!isAuth) {
          this.myRoute.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
          return false;
        } else {
          return true;
        }
      });
    }
}
