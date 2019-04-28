import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse,
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  env = this.appComponent.env;

  constructor(private authenticationService: AuthService, private router: Router, private appComponent: AppComponent) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('token');

    const cloned = req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + idToken)
    });
    return next.handle(cloned)
      .pipe(
        catchError(err => {
          console.log('Error! Status: ' + err.status + ' Message: ' + err.error.message);
           if (err.status === 401) {
             // auto logout if 401 response returned from api
             this.authenticationService.logout(this.env.apiUrl);
             this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url }});
           }
          this.appComponent.createErrorNotification(
            'Errore dal server!',
            'Alcune modifiche potrebbero non essere state salvate! Riprovare più tardi.');
           const error = err.error.message || err.statusText;
           return throwError(error);
         }),
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(' all looks good');
            // http response status code
            console.log(event.status);
          }
        })
      );
  }
}
