import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product.interface';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Output() deletedCard: EventEmitter<string> = new EventEmitter();

  @Input() showAddButton: boolean = true;
  @Input() product: Product = {
    id: -1,
    name: '',
    price: -1,
    volume: '',
    image: '',
    container: '',
    material: ''
  }

  constructor(private shoppingCartService: ShoppingCartService) { }

  public onDeletedCard(): void {
    this.deletedCard.emit(this.product.name);
  }

  public onAddToCart(): void {
    this.shoppingCartService.addProduct(this.product);
  }
}
