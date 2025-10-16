import { MatIconModule } from '@angular/material/icon';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogContent, MatDialogActions,MatDialogModule,MatIconModule,MatButtonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css'
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // renvoie "true" si confirmé
  }

  onCancel(): void {
    this.dialogRef.close(false); // renvoie "false" si annulé
  }
}
