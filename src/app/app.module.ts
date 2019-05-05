import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClarityModule } from '@clr/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ClickOutsideModule } from 'ng-click-outside';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import {SnotifyModule, SnotifyService, SnotifyToastConfig, ToastDefaults} from 'ng-snotify';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import {RequestInterceptor} from './interceptors/request-interceptor';
import { Error404Component } from './error-pages/error404/error404.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { HomeSettingsPageComponent } from './pages/home-settings-page/home-settings-page.component';
import { NewsSettingsPageComponent } from './pages/news-settings-page/news-settings-page.component';
import {CardNewsComponent} from './pages/news-settings-page/components/card-news/card-news.component';
import {SingleNewsComponent} from './pages/news-settings-page/components/single-news/single-news.component';
import { AboutMeSettingsPageComponent } from './pages/about-me-settings-page/about-me-settings-page.component';
import {TimelineComponent} from './pages/about-me-settings-page/timeline/timeline.component';

library.add(fas, far);

declare var Hammer: any;
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pan': { direction: Hammer.DIRECTION_All },
    'swipe': { direction: Hammer.DIRECTION_VERTICAL },
  };

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    Error404Component,
    LoginComponent,
    BasePageComponent,
    NotesPageComponent,
    HomeSettingsPageComponent,
    NewsSettingsPageComponent,
    CardNewsComponent,
    SingleNewsComponent,
    AboutMeSettingsPageComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '14px',
      fullScreenBackdrop: true,
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    ClarityModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    ClickOutsideModule,
    ContenteditableModule,
    NgSelectModule,
    NgxPageScrollModule,
    SnotifyModule,
    FontAwesomeModule,
    ColorPickerModule,
    DragDropModule
  ],
  providers: [
    AppComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: 'SnotifyToastConfig',
      useValue: ToastDefaults
    },
    SnotifyService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
