import { Component } from '@angular/core';
import { Header } from "../../shared/header/header";
import { ProductTable } from "../../shared/product-table/product-table";

@Component({
  selector: 'app-home',
  imports: [Header, ProductTable],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
