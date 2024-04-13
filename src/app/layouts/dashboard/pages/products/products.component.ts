import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

  products: IProduct[]= [];
  constructor(private producService: ProductService){
  }
  ngOnInit(): void {
    this.products = this.producService.getProducts();
  }
}
