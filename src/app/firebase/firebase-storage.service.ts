import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {UploadImageResponse} from './models/upload-image-response';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(private firebaseService: AngularFireStorage, private firebaseAuth: AngularFireAuth) { }

  uploadImage(event) {
    console.log(event);
    const name = event.target.files[0].name;
    this.ref = this.firebaseService.ref(name);
    this.task = this.ref.put(event.target.files[0]);
    return new UploadImageResponse(this.ref, this.task);
  }

  loginToFirebase(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }
}
