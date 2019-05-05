import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Note} from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {}

  getNotes(apiUrl: string): Observable<Note[]> {
    return this.http.get<Note[]>( apiUrl + '/common/notes');
  }

  createNote(apiUrl: string, note: Note) {
    return this.http.post( apiUrl + '/common/notes', note);
  }

  updateNoteById(apiUrl: string, id: number, note: Note) {
    return this.http.put( apiUrl + '/common/notes/' + id, note);
  }

  deleteNoteById(apiUrl: string, id: number) {
    return this.http.delete(apiUrl + '/common/notes/' + id);
  }
}
