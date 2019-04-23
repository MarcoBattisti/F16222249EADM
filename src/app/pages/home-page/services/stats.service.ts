import { Injectable } from '@angular/core';
import {HttpClient} from '../../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../models/users';
import {AvgSessionDuration} from '../models/avg-session-duration';
import {Visitors} from '../models/visitors';
import {PageViews} from '../models/page-views';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) {}

  getVisitorsOnline(apiUrl: string): Observable<Users[]> {
    return this.http.get<Users[]>( apiUrl + '/stats/users-online');
  }

  getTimeAverage(apiUrl: string): Observable<AvgSessionDuration[]> {
    return this.http.get<AvgSessionDuration[]>( apiUrl + '/stats/time-average');
  }

  getVisitors(apiUrl: string): Observable<Visitors[]> {
    return this.http.get<Visitors[]>( apiUrl + '/stats/visitors');
  }

  getMostVisitedPages(apiUrl: string): Observable<PageViews[]> {
    return this.http.get<PageViews[]>( apiUrl + '/stats/most-visited-pages');
  }
}
