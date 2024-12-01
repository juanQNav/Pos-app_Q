import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  products: { product: Product, quantity: number }[] = [];
  private productsSubscription: Subscription;

  constructor() {
    // Suscription to the products observable
    this.productsSubscription = this.shoppingCartService.products.subscribe(
      (products: { product: Product, quantity: number }[]) => {
        this.products = products;
      }
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  public totalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  public deleteElement(pid: number): void {
    this.shoppingCartService.deleteElement(pid);
  }

  public increaseQuantity(pid: number): void {
    this.shoppingCartService.increaseQuantity(pid);
  }

  public decreaseQuantity(pid: number): void {
    this.shoppingCartService.decreaseQuantity(pid);
  }
}
