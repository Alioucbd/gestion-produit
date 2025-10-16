
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import { EditProductDialog } from '../../features/edit-product-dialog/edit-product-dialog';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-product-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css'
})

export class ProductTable implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Product>([]);

  constructor(
    private _productService : ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ) {
    
  }

  ngOnInit(): void {
   // Assign the data to the data source for the table to render
    this._productService.getAllProducts().subscribe({
      next: () =>{
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits:', err);
     }});

     this.subscribeToProducts()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editeProduct(product: Product){
    const dialogRef = this.dialog.open(EditProductDialog, {
      width: '350px',
      data: { product: {...product} }
    });

       dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        // L'utilisateur a confirmé
        this._productService.editeProduct(updatedProduct).subscribe({
          next: () => {
            this.snackBar.open("Produit mis à jour avec succès ✅", "", { duration: 4000 });
          },
          error: err => {
              this.snackBar.open("Une erreur est survenue.", "", { duration: 4000 });
          }
        });
      }
    });
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '350px',
      data: { message: 'Voulez-vous vraiment supprimer ce produit ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // L'utilisateur a confirmé
        this._productService.deleteProduct(id).subscribe({
          next: () => {
            this.snackBar.open("Produit supprimé avec succès ✅", "", { duration: 4000 });
          },
          error: err => {
              this.snackBar.open("Une erreur est survenue ❌.", "", { duration: 4000 });
          }
        });
      }
    });
  }
    // Abonnement automatique aux changements
  private subscribeToProducts(): void {
    this._productService.products$
    .subscribe(products => this.dataSource.data = products);
  }
}

