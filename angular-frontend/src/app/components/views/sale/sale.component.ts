import { Component } from '@angular/core';
import { ProductListComponent } from '../../layouts/product-list/product-list.component';
import { ShoppingCartComponent } from '../../layouts/shopping-cart/shopping-cart.component';
import { HeaderComponent } from '../../layouts/header/header.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ProductListComponent, ShoppingCartComponent, HeaderComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {

}
