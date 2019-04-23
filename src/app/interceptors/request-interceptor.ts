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
import {Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('token');

    const cloned = req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + idToken)
    });
    return next.handle(cloned)
      .pipe(
        // catchError(err => {
        //   if (err.status === 401) {
        //     // auto logout if 401 response returned from api
        //     this.authenticationService.logout();
        //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url }});
        //   }
        //
        //   const error = err.error.message || err.statusText;
        //   return throwError(error);
        // }),
        tap(event => {
          if (event instanceof HttpResponse) {

            console.log(' all looks good');
            // http response status code
            console.log(event.status);
          }
        }, error => {
          // http response status code
          console.log('----response----');
          console.error('status code:');
          console.error(error.status);
          console.error(error.message);
          console.log('--- end of response---');

        })
      );
  }
}
