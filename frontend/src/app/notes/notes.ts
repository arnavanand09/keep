import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotesService } from '../services/notes';
import { Note } from '../note';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog';

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
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    EditNoteDialogComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  note: Note = { id: 0, title: '', text: '' };
  loading = true;

  constructor(
    private notesService: NotesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      (data) => {
        this.notes = data;
        this.loading = false;
      },
      (err) => {
        this.openSnackBar(err.message);
        this.loading = false;
      }
    );
  }

  addNote() {
    if (this.note.title && this.note.text) {
      this.notesService.addNote(this.note).subscribe(
        (data) => {
          this.notes.push(data);
          this.openSnackBar('Note added successfully');
        },
        (err) => this.openSnackBar(err.message)
      );
      this.note = { id: 0, title: '', text: '' };
    } else {
      this.openSnackBar('Title and Text are required');
    }
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(
      () => {
        this.notes = this.notes.filter(n => n.id !== id);
        this.openSnackBar('Note deleted successfully');
      },
      (err) => this.openSnackBar(err.message)
    );
  }

  openEditDialog(note: Note): void {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      width: '250px',
      data: { ...note }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.editNote(result).subscribe(
          () => {
            const index = this.notes.findIndex(n => n.id === result.id);
            this.notes[index] = result;
            this.openSnackBar('Note updated successfully');
          },
          (err) => this.openSnackBar(err.message)
        );
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}

