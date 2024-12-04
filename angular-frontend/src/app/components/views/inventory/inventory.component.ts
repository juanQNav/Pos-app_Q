import { Component, Input } from '@angular/core';
import { ProductListComponent } from '../../layouts/product-list/product-list.component';
import { EventEditProductService } from '../../../services/event-edit-product.service';
import { ModalEditProductComponent } from "../../layouts/modal-edit-product/modal-edit-product.component";
import { Product } from '../../../interfaces/product.interface';
import { ProductListService } from '../../../services/product-list.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ProductListComponent, ModalEditProductComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  @Input() isOpen: boolean = false;
  @Input() isCreating: boolean = false;
  public selectedProduct: Product = {
    _id: '',
    id: -1,
    name: '',
    price: -1,
    volume: '',
    image: '',
    container: '',
    material: ''
  }

  constructor(private evtSvc: EventEditProductService,
    private productListService: ProductListService
  ) { }

  ngOnInit() {
    this.evtSvc.emitModalStateListener().subscribe((state: boolean) => {
      this.isOpen = state;
    });

    this.evtSvc.selectedProductListener().subscribe((product: Product) => {
      this.selectedProduct = product;
      this.isCreating = false;
    });
  }

  public openCreateModal() {
    this.isOpen = true;
    this.isCreating = true;
    this.selectedProduct = {
      _id: '',
      id: -1,
      name: '',
      price: 0,
      volume: '',
      image: '',
      container: '',
      material: ''
    };
  }

  public closeModal(state: boolean) {
    this.isOpen = state;
  }
}
