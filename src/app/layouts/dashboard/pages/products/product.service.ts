import { Injectable } from '@angular/core';
import { IProduct } from './models';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts():IProduct[]{
    return [
      {
        id:1,
        name: 'pc game',
        price:3000
      }
    ];
  }
}
