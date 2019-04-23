import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {AuthService} from '../../authentication/auth.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent {

  loading = true;

  env = this.app.env;

  openModal = false;

  constructor(private router: Router, private auth: AuthService, private app: AppComponent) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
      window.scrollTo(0, 0);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => { // here
        this.loading = false;
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => { // here
        this.loading = false;
      }, 2000);
    }
  }

  logOut() {
    this.openModal = false
    this.loading = true;
    this.auth.logout(this.env.apiUrl).subscribe(
      res => {
          this.auth.removeToken();
          console.log('User logout!');
          console.log('Redirect to: auth/login');
          this.router.navigate(['auth/login']);
      },
      error => {
        console.log(error);
        this.loading = false;
      } );
    }
}
