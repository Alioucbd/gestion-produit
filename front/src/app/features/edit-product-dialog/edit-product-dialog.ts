import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-edit-product-dialog',
  imports: [MatDialogContent, MatDialogActions,MatDialogModule,MatButtonModule,MatFormFieldModule,MatInputModule, FormsModule,],
  templateUrl: './edit-product-dialog.html',
  styleUrl: './edit-product-dialog.css'
})

export class EditProductDialog {
    
  constructor(
    public dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data.product);
  }

  onCancel(): void {
    this.dialogRef.close(false); // renvoie "false" si annulé
  }
}
