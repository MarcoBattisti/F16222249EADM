import {Component} from '@angular/core';
import { environment } from '../environments/environment';
import {SnotifyPosition, SnotifyService, SnotifyToastConfig} from 'ng-snotify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  env = environment;

  constructor(private snotifyService: SnotifyService) {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: true,
        maxAtPosition: 6,
        maxOnScreen: 8,
      },
    });
  }

  private snotifyConfiguration(timeout: number): SnotifyToastConfig {
    return {
      bodyMaxLength: 80,
      titleMaxLength: 20,
      backdrop: -1,
      position: SnotifyPosition.leftBottom,
      timeout: timeout,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    };
  }

  createSuccessNotification(title: string, body: string) {
    this.snotifyService.success(body, title, this.snotifyConfiguration(3500));
  }

  createErrorNotification(title: string, body: string) {
    this.snotifyService.error(body, title, this.snotifyConfiguration(0));
  }

}
