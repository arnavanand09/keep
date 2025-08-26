import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.html',
  styleUrls: ['./edit-note-dialog.css']
})
export class EditNoteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
