import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = "http://localhost:8080/api/drinks/";
  private _products: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  public get products(): Product[] {
    return this._products;
  }

  public deleteElement(name: string) {
    this._products = this._products.filter(product => product.name !== name);
    this.productsSubject.next(this._products);
  }

  public fetchProducts() {
    this.http.get<Product[]>(this.apiUrl, {
      headers: {
        "Authorization": this.authService.getToken(),
      }
    }).subscribe(
      {
        next: (response) => {
          this._products = response;
          this.productsSubject.next(this._products);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  public updateProductWithImage(_id: string, formData: FormData) {
    const url = `${this.apiUrl}${_id}`;
    return this.http.put<Product>(url, formData, {
      headers: {
        "Authorization": this.authService.getToken(),
      }
    });
  }

  public updateLocalProduct(updatedProduct: Product): void {
    const index = this._products.findIndex(p => p._id === updatedProduct._id);
    if (index !== -1) {
      this._products[index] = updatedProduct;
    }
    this.productsSubject.next(this._products);
  }

  public createProduct(product: Product) {
    const url = this.apiUrl;
    return this.http.post<Product>(url, product, {
      headers: {
        "Authorization": this.authService.getToken(),
      }
    });
  }

}