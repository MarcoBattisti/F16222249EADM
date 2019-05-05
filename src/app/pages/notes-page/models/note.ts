import {NoteContent} from './note-content';

export class Note {

  id: number;
  type: string;
  title: string;
  contents: NoteContent[];

  constructor(type: string) {
    this.type = type;
    this.contents = [new NoteContent()];
  }
}
