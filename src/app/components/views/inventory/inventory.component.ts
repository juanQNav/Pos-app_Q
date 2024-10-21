import { Component } from '@angular/core';
import { ProductListComponent } from '../../layouts/product-list/product-list.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
