import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/drinks/";
  private _products: Product[] = [];


  public get products(): Product[] {
    return this._products;
  }

  public deleteElement(name: string) {
    this._products = this._products.filter(product => product.name !== name);
  }

  public fetchProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      {
        next: (response) => {
          this._products = response;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
