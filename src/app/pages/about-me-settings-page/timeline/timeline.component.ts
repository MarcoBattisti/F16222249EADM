import {Component, Input, OnInit} from '@angular/core';
import { TimelineEvent } from './model/timeline-event';
import {TimelineService} from './service/timeline-service';
import {AppComponent} from '../../../app.component';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() moveMode: boolean;

  env = this.appComponent.env;

  colorPattern = new RegExp('#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');

  timelineEvents: TimelineEvent[];

  timelineIcons = ['graduation-cap', 'book', 'briefcase', 'birthday-cake', 'city', 'pen-fancy'];

  timelineChanged: number;
  saveTimeline = false;

  public Editor = InlineEditor;

  modalEvent: TimelineEvent;
  openEventDeleteModal = false;

  creationMode = false;
  tempTimelineEvent: TimelineEvent;

  openDropdown = false;
  dropdownId: number;

  constructor(private timelineService: TimelineService, private appComponent: AppComponent) {}

  ngOnInit() {
    this.getTimelineEvents();
  }

  getTimelineEvents() {
    this.timelineService.getTimelineEvents(this.env.apiUrl).subscribe(data => {
      this.timelineEvents = data;
      this.timelineEvents.forEach(timelineEvent => {
        if (!this.colorIsValid(timelineEvent.color)) {
          timelineEvent.color = '#999999';
        }
      });
    });
  }

  updateTimelineEventById(i: number, event: TimelineEvent) {
    if (this.saveTimeline && i === this.timelineChanged) {
      this.timelineService.updateTimelineEventById(this.env.apiUrl, event.id, event)
        .subscribe(
          data => {},
          error => { console.log(error); },
          () => {
            this.saveTimeline = false;
            this.timelineChanged = null;
            this.getTimelineEvents();
            this.appComponent.createSuccessNotification(
              'Aggiornata!',
              'La Timeline è stata aggiornata correttamente!');
          }
        );
    }
  }

  updateAllTimelineEvents() {
    this.timelineService.updateAllTimelineEvents(this.env.apiUrl, this.timelineEvents)
      .subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.getTimelineEvents();
          this.appComponent.createSuccessNotification(
            'Aggiornati!',
            'Gli eventi sono stati aggiornati correttamente!');
        }
      );
  }

  private colorIsValid(color: string): boolean {
    return this.colorPattern.test(color);
  }

  public onChange(i: number, { editor }: ChangeEvent ) {
    this.timelineEvents[i].text = editor.getData();
    this.saveTimeline = true;
    this.timelineChanged = i;
  }

  public onChangeTempEventText({ editor }: ChangeEvent ) {
    this.tempTimelineEvent.text = editor.getData();
  }

  openDeleteModal(event: TimelineEvent) {
    this.modalEvent = event;
    this.openEventDeleteModal = true;
  }

  delete(id: number) {
    this.timelineService.deleteTimelineEventById(this.env.apiUrl, id)
      .subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.getTimelineEvents();
          this.openEventDeleteModal = false;
          this.appComponent.createSuccessNotification(
            'Eliminato!',
            'L\'evento selezionato è stato eliminato correttamente!');
        }
      );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timelineEvents, event.previousIndex, event.currentIndex);
    this.updateOrderItems();
    this.updateAllTimelineEvents();
  }

  updateOrderItems() {
    this.timelineEvents.map(
      (value, index) => value.event_order = index
    );
  }

  createNewTimelineEvent() {
    this.tempTimelineEvent = new TimelineEvent(
      0, 'Inserisci qua il titolo dell\'evento..', 'Inserisci qua il testo dell\'evento',
      '#60e200', '', this.timelineEvents.length);

    this.creationMode = true;

  }

  createTimelineEvent() {
    this.timelineService.createTimelineEvent(this.env.apiUrl, this.tempTimelineEvent)
      .subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.getTimelineEvents();
          this.creationMode = false;
          this.appComponent.createSuccessNotification(
            'Creato!',
            'L\'evento è stato creato correttamente!');
        }
      );
  }
}
