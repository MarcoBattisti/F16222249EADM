import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginComponent} from './authentication/login/login.component';
import {AuthGuard} from './authentication/auth.guard';
import {Error404Component} from './error-pages/error404/error404.component';
import {BasePageComponent} from './pages/base-page/base-page.component';
import {NotesPageComponent} from './pages/notes-page/notes-page.component';
import {HomeSettingsPageComponent} from './pages/home-settings-page/home-settings-page.component';

const routes: Routes = [
  // Redirects route
  {path: '', redirectTo: '/admin', pathMatch: 'full'},
  {path: 'admin', redirectTo: '/admin/home', pathMatch: 'full'},
  // Login routes
  {path: 'auth/login', component: LoginComponent},
  // Admin routes
  {path: 'admin', component: BasePageComponent, canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'notes', component: NotesPageComponent},
      {path: 'pages', children: [
          {path: 'home-page', component: HomeSettingsPageComponent},
          // {path: 'news-page', component: NotesPageComponent}
      ]}
    ]},
  // Page not found routes
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
