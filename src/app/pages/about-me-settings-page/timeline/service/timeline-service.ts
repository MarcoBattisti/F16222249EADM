import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TimelineEvent} from '../model/timeline-event';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) {}

  getTimelineEvents(apiUrl: string): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>( apiUrl + '/common/timeline-events');
  }

  createTimelineEvent(apiUrl: string, timelineEvent: TimelineEvent) {
    return this.http.post( apiUrl + '/common/timeline-events', timelineEvent);
  }

  updateTimelineEventById(apiUrl: string, id: number, timelineEvent: TimelineEvent) {
    return this.http.put( apiUrl + '/common/timeline-events/' + id, timelineEvent);
  }

  updateAllTimelineEvents(apiUrl: string, timelineEvents: TimelineEvent[]): Observable<Object> {
    return this.http.put( apiUrl + '/common/timeline-events', timelineEvents);
  }

  deleteTimelineEventById(apiUrl: string, id: number) {
    return this.http.delete( apiUrl + '/common/timeline-events/' + id);
  }
}
