import { Component } from '@angular/core';
import { AddProductDialog } from '../../features/add-product-dialog/add-product-dialog';
import { ProductService } from '../../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
    constructor(
      private _productService : ProductService,
      private dialog: MatDialog
    ){}

    openAddProductDialog() {
      const dialogRef = this.dialog.open(AddProductDialog, {
        width: '500px',    // largeur du dialog
        height: 'auto',    // hauteur automatique
        disableClose: true // empêche la fermeture en cliquant à l’extérieur
      });

      dialogRef.afterClosed().subscribe(newProduct => {
        if(newProduct) {
          this._productService.addProduct(newProduct).subscribe();
        }
      });
    }
}
