import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthToken} from './model/auth-token';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_FIELD = 'token';

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string, apiUrl: string) {
    return this.http.post<AuthToken>(apiUrl + '/login', {email, password});
  }

  logout(apiUrl: string) {
    return this.http.get(apiUrl + '/logout?token=' + localStorage.getItem(this.TOKEN_FIELD));
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_FIELD);
  }
  public loggedIn(apiUrl: string): Promise<boolean> {
      console.log('in loggedIn Method ');
      return this.http.get(apiUrl + '/user?token=' + localStorage.getItem(this.TOKEN_FIELD), {observe: 'response'}).pipe(
        map(res => {
          return res.status === 200;
        })).toPromise().catch((err: HttpErrorResponse) => {
          if (err.status === 401) {
              return false;
          } else {
            console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
            return false;
          }
      });
  }
}
