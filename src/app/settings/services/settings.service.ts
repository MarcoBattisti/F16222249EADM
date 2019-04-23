import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Setting} from '../models/setting';
import {BaseSetting} from '../models/base-setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {}

  getSettingsBySection(apiUrl: string, section: string): Observable<Setting[]> {
    return this.http.get<Setting[]>( apiUrl + '/settings', {
      params: {
        section: section
      }
    });
  }

  updateSettingById(apiUrl: string, id: number, setting: Setting): Observable<Object> {
    return this.http.put( apiUrl + '/settings/' + id, setting);
  }

  getPersonalStats(apiUrl: string): Observable<BaseSetting[]> {
    return this.http.get<BaseSetting[]>( apiUrl + '/settings/personal/stats');
  }

  updatePersonalStats(apiUrl: string, personalStats: BaseSetting[]) {
    return this.http.put( apiUrl + '/settings/personal/stats', personalStats);
  }

}
