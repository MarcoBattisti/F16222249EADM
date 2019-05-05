import { Component, OnInit } from '@angular/core';
import {Note} from './models/note';
import {NotesService} from './services/notes.service';
import {AppComponent} from '../../app.component';
import {NoteContent} from './models/note-content';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {

  env = this.appComponent.env;

  notes: Note[];

  openModal = false;
  modalTitle: string;
  modalNote: Note;
  isUpdate = false;

  constructor(private notesService: NotesService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes(this.env.apiUrl)
      .subscribe(
      data => this.notes = data
    );
  }

  saveNote() {
    if (!this.isUpdate) {
      this.createNote();
    } else {
      this.updateNote();
    }
  }

  createNote() {
    this.notesService.createNote(this.env.apiUrl, this.modalNote)
      .subscribe(
        data => {},
        error => console.log(error),
        () => {
          this.getNotes();
          this.openModal = false;
          this.appComponent.createSuccessNotification(
            'Creata!',
            'La nota è stata creata correttamente!');
        }
      );
  }

  updateNote() {
    this.notesService.updateNoteById(this.env.apiUrl, this.modalNote.id, this.modalNote)
      .subscribe(
        data => {},
        error => console.log(error),
        () => {
          this.getNotes();
          this.isUpdate = false;
          this.openModal = false;
          this.appComponent.createSuccessNotification(
            'Aggiornata!',
            'La nota è stata aggiornata correttamente!');
        }
      );
  }

  deleteNote(id: number) {
    this.notesService.deleteNoteById(this.env.apiUrl, id)
      .subscribe(
        data => {},
        error => console.log(error),
        () => {
          this.getNotes();
          this.appComponent.createSuccessNotification(
            'Eliminata!',
            'La nota è stata eliminata correttamente!');
        }
      );
  }

  showCreationModal(title: string) {
    this.modalNote = new Note('default');
    this.modalTitle = title;
    this.openModal = true;
  }

  showUpdateModal(title: string, i: number) {
    this.modalNote = this.notes[i];
    this.modalTitle = title;
    this.isUpdate = true;
    this.openModal = true;
  }

  pushContent() {
    this.modalNote.contents.push(new NoteContent());
  }
}
