import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ModalPaymentComponent } from '../modal-payment/modal-payment.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ModalPaymentComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  products: { product: Product, quantity: number }[] = [];
  private productsSubscription: Subscription;

  isModalOpen = false;
  paymentAmount: number = 0;
  totalPriceValue: number = 0;
  change: number | null = null;
  error: string | null = null;

  constructor() {
    this.productsSubscription = this.shoppingCartService.products.subscribe(
      (products: { product: Product, quantity: number }[]) => {
        this.products = products;
        this.totalPriceValue = this.shoppingCartService.getTotalPrice();
      }
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  public totalPrice(): number {
    return this.totalPriceValue;
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

  public openModal(): void {
    this.isModalOpen = true;
    this.change = null;
    this.error = null;
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.paymentAmount = 0;
    this.change = null;
    this.error = null;
  }

  public handlePayment(paymentAmount: number): void {
    if (paymentAmount >= this.totalPrice()) {
      this.change = paymentAmount - this.totalPrice();
      this.error = null;
    } else {
      this.error = 'El monto ingresado es insuficiente. Por favor, ingrese una cantidad válida.';
      this.change = null;
    }
  }

  public handleTryAgaing(): void {
    this.error = null;
    this.change = null;
    // this.paymentAmount = 0;
  }
}
