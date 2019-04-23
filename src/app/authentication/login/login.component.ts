import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AppComponent} from '../../app.component';
import {FirebaseStorageService} from '../../firebase/firebase-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;

  TOKEN_FIELD = 'token';

  env = this.app.env;
  form;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private myRoute: Router,
              private auth: AuthService,
              private app: AppComponent,
              private firebaseService: FirebaseStorageService) {
    this.form = fb.group({
      email: [''],
      password: ['']
    });
  }
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/home';
  }

  login() {
    this.loading = true;
    this.auth.login(this.form.value.email, this.form.value.password, this.env.apiUrl).subscribe(
      res => {
        localStorage.setItem(this.TOKEN_FIELD, res.token);
        this.auth.loggedIn(this.env.apiUrl).then(isAuth => {
          console.log('isAuth -> ' + isAuth);
          if (isAuth) {
            this.firebaseService.loginToFirebase(this.form.value.email, this.form.value.password)
              .then(response => {
                console.log('User logged!');
                console.log('Redirect to: ' + this.returnUrl);
                this.myRoute.navigateByUrl(this.returnUrl);
            }, err => {
                this.form.setErrors({ 'invalid': true });
                this.auth.removeToken();
            });
          } else {
            this.form.setErrors({ 'invalid': true });
            this.auth.removeToken();
          }
          this.loading = false;
        });
      },
      error => {
        this.loading = false;
        this.form.setErrors({ 'invalid': true });
        console.log(error);
      });
  }
}
