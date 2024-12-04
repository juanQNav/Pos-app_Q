import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product.interface';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { EventEditProductService } from '../../../services/event-edit-product.service';

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
  @Input() showEditButton: boolean = false;
  @Input() product: Product = {
    _id: '',
    id: -1,
    name: '',
    price: -1,
    volume: '',
    image: '',
    container: '',
    material: ''
  }
  private modal_state = false;

  constructor(private shoppingCartService: ShoppingCartService, private evtSvc: EventEditProductService) { }

  onClick() {
    this.modal_state = !this.modal_state;
    this.evtSvc.emitModalStateEvent(true);
    this.evtSvc.emitSelectedProduct(this.product);
  }

  public onDeletedCard(): void {
    this.deletedCard.emit(this.product.name);
  }

  public onAddToCart(): void {
    this.shoppingCartService.addProduct(this.product);
  }
}
