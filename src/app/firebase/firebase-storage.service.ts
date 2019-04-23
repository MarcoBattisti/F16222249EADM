import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  loginToFirebase(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }
}
