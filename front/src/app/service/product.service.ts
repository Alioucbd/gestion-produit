
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';

const username = 'admin1';
const password = '1234';
const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa(`${username}:${password}`)
});

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products'; 
  //dataSource = new MatTableDataSource<Product>([]);pas ca: le service doit etre propre
  private _products$ = new BehaviorSubject<Product[]>([]);
  public products$ = this._products$.asObservable();

  constructor(private http : HttpClient){

  }

    // --- 🔹 gestion du state
  private addProductToState(product: Product) {
    const current = this._products$.getValue();
    this._products$.next([...current, product]);
  }

  private updateProductInState(updated: Product) {
    const current = this._products$.getValue();
    this._products$.next(current.map(p => p.id === updated.id ? updated : p));
  }

  private deleteProductFromState(id: number) {
    const current = this._products$.getValue();
    this._products$.next(current.filter(p => p.id !== id));
  }

  public getAllProducts (): Observable<Product[]>{
   return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this._products$.next(products)));
  }

  public getProduct (id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);//utilise des backtiks pour la lisibilite
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl,product).pipe(
      tap(newProduct => this.addProductToState(newProduct)));
  } 

  public editeProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(this.apiUrl,product).pipe(
      tap(updated => this.updateProductInState(updated)));
  }

  public deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.deleteProductFromState(id)));
  }
}
