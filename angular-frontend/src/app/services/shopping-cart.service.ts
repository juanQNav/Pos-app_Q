import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';  // Importamos BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // Use BehaviorSubject to store the products in the shopping cart
  private _products: BehaviorSubject<{ product: Product, quantity: number }[]> = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);

  // Add a product to the shopping cart
  public addProduct(product: Product): void {
    const currentProducts = this._products.value;
    const existingProduct = currentProducts.find(item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this._products.next([...currentProducts, { product, quantity: 1 }]);
    }
    console.log('Productos en el carrito:', this._products.value);
  }

  public deleteElement(pid: number): void {
    const currentProducts = this._products.value;
    this._products.next(currentProducts.filter(item => item.product.id !== pid));
  }

  public increaseQuantity(pid: number): void {
    const currentProducts = this._products.value;
    const product = currentProducts.find(item => item.product.id === pid);

    if (product) {
      product.quantity++;
      this._products.next([...currentProducts]);
    }
  }

  public decreaseQuantity(pid: number): void {
    const currentProducts = this._products.value;
    const product = currentProducts.find(item => item.product.id === pid);
    if (product && product.quantity > 1) {
      product.quantity--;
      this._products.next([...currentProducts]);
    }
  }

  // Return the products in the shopping cart as an observable
  public get products() {
    return this._products.asObservable();
  }

  public getTotalPrice(): number {
    return this._products.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
}