import { Component, inject, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgClass } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { ProductListService } from '../../../services/product-list.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardComponent, NgClass, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  @Input() showAddButton: boolean = true;
  @Input() showEditButton: boolean = false;
  @Input() xlCols: number = 5;

  public products$: Observable<Product[]>;

  private productListService = inject(ProductListService);

  constructor() {
    this.products$ = this.productListService.products$;
  }

  ngOnInit() {
    this.productListService.fetchProducts();
  }

  public deleteElement(name: string): void {
    this.productListService.deleteElement(name);
  }
}
