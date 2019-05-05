import { Component, OnInit } from '@angular/core';
import {Setting} from '../../settings/models/setting';
import {Observable} from 'rxjs';
import {SettingsService} from '../../settings/services/settings.service';
import {AppComponent} from '../../app.component';
import {FirebaseStorageService} from '../../firebase/firebase-storage.service';
import {finalize} from 'rxjs/operators';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-about-me-settings-page',
  templateUrl: './about-me-settings-page.component.html',
  styleUrls: ['./about-me-settings-page.component.scss']
})
export class AboutMeSettingsPageComponent implements OnInit {

  settings: Setting[];

  properties = ['image', 'introduction'];

  section = 'about-me';

  env = this.appComponent.env;

  uploadProgress: Observable<number>;
  downloadURL: string;

  public Editor = InlineEditor;
  editorData: string;
  saveIntroduction = false;

  moveEvent = false;

  constructor(private settingService: SettingsService, private appComponent: AppComponent,
              private firebaseStorageService: FirebaseStorageService) { }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.settingService.getSettingsBySection(this.env.apiUrl, this.section)
      .subscribe(data => this.settings = data );
  }

  findSettingByName(name: string) {
    return this.settings.find(x => x.name === name);
  }

  uploadImage(event) {
    const uploadImageResponse = this.firebaseStorageService.uploadImage(event);
    this.uploadProgress = uploadImageResponse.task.percentageChanges();
    uploadImageResponse.task.snapshotChanges().pipe(
      finalize(() => {
        uploadImageResponse.ref.getDownloadURL().subscribe(data => {
          this.downloadURL = data;
          this.changeImage(this.downloadURL);
        });
      })
    ).subscribe();
  }

  changeImage(downloadURL: string) {
    const temp: Setting = this.findSettingByName(this.properties[0]);
    temp.value = downloadURL;
    this.settingService.updateSettingById(this.env.apiUrl, temp.id, temp).subscribe(
      data => {},
      error => { console.log(error); },
      () => {
        this.getSettings();
        this.appComponent.createSuccessNotification(
          'Salvata!',
          'L\'immagine è stata aggiornata correttamente!');
      }
    );
  }

  saveIntroductionText() {
    if (this.saveIntroduction) {
      const temp: Setting = this.findSettingByName(this.properties[1]);
      temp.value = this.editorData;
      this.settingService.updateSettingById(this.env.apiUrl, temp.id, temp).subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.saveIntroduction = false;
          this.getSettings();
          this.appComponent.createSuccessNotification(
            'Salvato!',
            'L\'introduzione è stata aggiornata correttamente!');
        }
      );

    }
  }

  public onChange( { editor }: ChangeEvent ) {
    this.editorData = editor.getData();
    this.saveIntroduction = true;
  }
}
