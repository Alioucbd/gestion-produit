import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product-dialog',
  imports: [CommonModule,ReactiveFormsModule,MatDialogContent, MatDialogActions,MatDialogModule,MatButtonModule,MatFormFieldModule,MatInputModule, FormsModule,],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.css'
})
export class AddProductDialog {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialog>
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.dialogRef.close(newProduct);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
