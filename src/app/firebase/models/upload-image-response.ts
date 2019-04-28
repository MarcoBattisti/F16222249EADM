import {AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

export class UploadImageResponse {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(ref: AngularFireStorageReference, task: AngularFireUploadTask) {
    this.ref = ref;
    this.task = task;
  }
}
