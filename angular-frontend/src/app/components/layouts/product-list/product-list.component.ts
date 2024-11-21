import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgClass } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { ProductListService } from '../../../services/product-list.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardComponent, NgClass],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() showAddButton: boolean = true;
  @Input() xlCols: number = 5;

  private productListService = inject(ProductListService);

  constructor() {
    this.productListService.fetchProducts();
  }
  public get products(): Product[] {
    return this.productListService.products
  }

  public deleteElement(name: string): void {
    this.productListService.deleteElement(name);
  }
}
