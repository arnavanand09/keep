import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { NotesService } from '../services/notes';
import { Note } from '../note';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule
  ],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  errMessage: string = '';
  note: Note = { id: 0, title: '', text: '' };

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      (data) => this.notes = data,
      (err) => this.errMessage = err.message
    );
  }

  addNote() {
    if (this.note.title && this.note.text) {
      this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        (data) => {},
        (err) => {
          this.errMessage = err.message;
          this.notes = this.notes.filter(n => n.title !== this.note.title);
        }
      );
      this.note = { id: 0, title: '', text: '' };
    } else {
      this.errMessage = 'Title and Text are required';
    }
  }
}

