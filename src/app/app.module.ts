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

import {RequestInterceptor} from './interceptors/request-interceptor';
import { Error404Component } from './error-pages/error404/error404.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { HomeSettingsPageComponent } from './pages/home-settings-page/home-settings-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    Error404Component,
    LoginComponent,
    BasePageComponent,
    NotesPageComponent,
    HomeSettingsPageComponent
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
  ],
  providers: [
    AppComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
