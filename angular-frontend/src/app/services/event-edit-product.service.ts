import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class EventEditProductService {
  private editProductClickEvent = new Subject<boolean>();
  private selectedProduct = new Subject<Product>();

  public emitModalStateEvent(state: boolean) {
    this.editProductClickEvent.next(state);
  }

  public emitModalStateListener() {
    return this.editProductClickEvent.asObservable();
  }

  public emitSelectedProduct(product: Product) {
    this.selectedProduct.next(product);
  }

  public selectedProductListener() {
    return this.selectedProduct.asObservable();
  }
}
