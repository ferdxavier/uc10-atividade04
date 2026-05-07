import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image-modal',
  templateUrl: './view-image-modal.component.html',
  styleUrls: ['./view-image-modal.component.css'],
})
export class ViewImageModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { caminho: string },
  ) {}
}
