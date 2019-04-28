import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../settings/services/settings.service';
import {Setting} from '../../settings/models/setting';
import {AppComponent} from '../../app.component';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {BaseSetting} from '../../settings/models/base-setting';
import {CarouselItemService} from './services/carousel-item.service';
import {CarouselItem} from './models/carousel-item';
import {FirebaseStorageService} from '../../firebase/firebase-storage.service';

@Component({
  selector: 'app-home-settings-page',
  templateUrl: './home-settings-page.component.html',
  styleUrls: ['./home-settings-page.component.scss']
})
export class HomeSettingsPageComponent implements OnInit {

  settings: Setting[];

  properties = ['image', 'image-text'];

  personalStats: BaseSetting[];
  statsChanged: number;
  saveOfStatsIsNeeded = false;

  section = 'home';

  env = this.appComponent.env;

  uploadProgress: Observable<number>;
  downloadURL: string;

  public Editor = InlineEditor;
  editorData: string;
  saveOfTextIsNeeded = false;

  carouselItems: CarouselItem[];
  carouselChanged: number;
  saveOfCarouselIsNeeded = false;
  isCarouselCreationMode = false;
  tempCarousel: CarouselItem;
  openCarouselDeleteModal = false;

  constructor(private settingService: SettingsService, private appComponent: AppComponent,
              private firebaseStorageService: FirebaseStorageService, private carouselItemService: CarouselItemService) { }

  ngOnInit() {
    this.getSettings();
    this.getPersonalStats();
    this.getCarouselItems();
  }

  getSettings() {
    this.settingService.getSettingsBySection(this.env.apiUrl, this.section)
      .subscribe(data => this.settings = data );
  }

  getPersonalStats() {
    this.settingService.getPersonalStats(this.env.apiUrl)
      .subscribe(data => this.personalStats = data );
  }

  getCarouselItems() {
    this.carouselItemService.getCarouselItems(this.env.apiUrl)
      .subscribe(data => this.carouselItems = data);
  }

  findSettingByName(name: string) {
    return this.settings.find(x => x.name === name);
  }

  uploadIntroductionImage(event) {
    const uploadImageResponse = this.firebaseStorageService.uploadImage(event);
    this.uploadProgress = uploadImageResponse.task.percentageChanges();
    uploadImageResponse.task.snapshotChanges().pipe(
      finalize(() => {
        uploadImageResponse.ref.getDownloadURL().subscribe(data => {
          this.downloadURL = data;
          this.changeIntroductionImage(this.downloadURL);
        });
      })
    ).subscribe();
  }

  changeIntroductionImage(downloadURL: string) {
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
          this.statsChanged = null;
          this.saveOfStatsIsNeeded = false;
          this.getPersonalStats();
        }
      );
    }
  }

  onChangeStats(i: number) {
    console.log('stats changed!');
    this.statsChanged = i;
    this.saveOfStatsIsNeeded = true;
  }

  uploadCarouselmage(event, index: number) {
    const uploadImageResponse = this.firebaseStorageService.uploadImage(event);
    this.uploadProgress = uploadImageResponse.task.percentageChanges();
    uploadImageResponse.task.snapshotChanges().pipe(
      finalize(() => {
        uploadImageResponse.ref.getDownloadURL().subscribe(data => {
          this.downloadURL = data;
          this.changeCarouselImage(this.downloadURL, index);
        });
      })
    ).subscribe();
  }

  changeCarouselImage(downloadURL: string, index: number) {
      this.carouselItems[index].backgroundLink = downloadURL;
      this.carouselItemService.updateCarouselById(this.env.apiUrl, this.carouselItems[index].id, this.carouselItems[index]).subscribe(
        data => {},
        error => { console.log(error); },
        () => { this.getCarouselItems(); }
      );
  }

  saveCarousel() {
    const i = this.carouselChanged;
    if (this.saveOfCarouselIsNeeded) {
      this.carouselItemService.updateCarouselById(this.env.apiUrl, this.carouselItems[i].id, this.carouselItems[i]).subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.carouselChanged = null;
          this.saveOfCarouselIsNeeded = false;
          this.getCarouselItems();
        }
      );
    }
  }

  onChangeCarousel(i: number) {
    console.log('carousel changed!');
    this.carouselChanged = i;
    this.saveOfCarouselIsNeeded = true;
  }

  deleteCarousel(index: number) {
    this.openCarouselDeleteModal = false;
    this.carouselItemService.deleteCarouselById(this.env.apiUrl, this.carouselItems[index].id).subscribe(
      data => {},
      error => {console.log(error); },
      () => {
        this.getCarouselItems();
      }
    );
  }

  openCreationMode() {
    this.tempCarousel = new CarouselItem('assets/choose-photo-placeholder.jpeg', 'Inserisci qua il testo del carousel..', 'Inserisci qui l autore del testo..');
    this.isCarouselCreationMode = true;
  }

  uploadTempCarouselmage(event) {
    const uploadImageResponse = this.firebaseStorageService.uploadImage(event);
    this.uploadProgress = uploadImageResponse.task.percentageChanges();
    uploadImageResponse.task.snapshotChanges().pipe(
      finalize(() => {
        uploadImageResponse.ref.getDownloadURL().subscribe(data => {
          this.downloadURL = data;
          this.changeTempCarouselImage(this.downloadURL);
        });
      })
    ).subscribe();
  }

  changeTempCarouselImage(downloadURL: string) {
    console.log(downloadURL);
    this.tempCarousel.backgroundLink = downloadURL;
  }

  saveTempCarousel() {
    this.carouselItemService.saveNewCarousel(this.env.apiUrl, this.tempCarousel).subscribe(
      data => {},
      error => { console.log(error); },
      () => {
        this.isCarouselCreationMode = false;
        this.getCarouselItems();
      }
    );
  }

  deleteTempCarousel() {
    this.isCarouselCreationMode = false;
  }
}
