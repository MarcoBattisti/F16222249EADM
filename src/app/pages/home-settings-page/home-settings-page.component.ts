import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../settings/services/settings.service';
import {Setting} from '../../settings/models/setting';
import {AppComponent} from '../../app.component';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {BaseSetting} from '../../settings/models/base-setting';

@Component({
  selector: 'app-home-settings-page',
  templateUrl: './home-settings-page.component.html',
  styleUrls: ['./home-settings-page.component.scss']
})
export class HomeSettingsPageComponent implements OnInit {

  settings: Setting[];

  properties = ['image', 'image-text'];

  personalStats: BaseSetting[];
  saveOfStatsIsNeeded = false;

  section = 'home';

  env = this.appComponent.env;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: string;

  public Editor = InlineEditor;
  editorData: string;
  saveOfTextIsNeeded = false;

  constructor(private settingService: SettingsService, private appComponent: AppComponent,
              private firebaseService: AngularFireStorage) { }

  ngOnInit() {
    this.getSettings();
    this.getPersonalStats();
  }

  getSettings() {
    this.settingService.getSettingsBySection(this.env.apiUrl, this.section)
      .subscribe(data => this.settings = data );
  }

  getPersonalStats() {
    this.settingService.getPersonalStats(this.env.apiUrl)
      .subscribe(data => this.personalStats = data );
  }

  findSettingByName(name: string) {
    return this.settings.find(x => x.name === name);
  }

  uploadImage(event) {
    console.log(event);
    const name = event.target.files[0].name;
    this.ref = this.firebaseService.ref(name);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(data => {
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
      () => { this.getSettings(); }
    );
  }

  saveText() {
    if (this.saveOfTextIsNeeded) {
      const temp: Setting = this.findSettingByName(this.properties[1]);
      temp.value = this.editorData;
      this.settingService.updateSettingById(this.env.apiUrl, temp.id, temp).subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.saveOfTextIsNeeded = false;
          this.getSettings();
        }
      );

    }
  }

  public onChange( { editor }: ChangeEvent ) {
    this.editorData = editor.getData();
    this.saveOfTextIsNeeded = true;
  }

  saveStats() {
    if (this.saveOfStatsIsNeeded) {
      this.settingService.updatePersonalStats(this.env.apiUrl, this.personalStats).subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.saveOfStatsIsNeeded = false;
          this.getPersonalStats();
        }
      );
    }
  }

  onChangeStats() {
    console.log('stats changed!');
    this.saveOfStatsIsNeeded = true;
  }
}
