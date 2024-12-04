import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product.interface';
import { ProductListService } from '../../../services/product-list.service';

@Component({
  selector: 'app-modal-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent {
  @Input() isOpen: boolean = false;
  @Input() isCreating: boolean = false;
  @Input() product: Product = {
    _id: '',
    id: -1,
    name: '',
    price: 0,
    volume: '',
    image: '',
    container: '',
    material: ''
  };
  @Output() eventCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() eventSaveProduct: EventEmitter<Product> = new EventEmitter();

  public previewUrl: string | null = null;
  public selectedFile: File | null = null;
  public invalidFileType: boolean = false;

  public editedProduct: Product = { ...this.product };

  constructor(private productListService: ProductListService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.editedProduct = { ...this.product };
    }
  }

  public closeModal(): void {
    this.isOpen = false;
    this.eventCloseModal.emit(this.isOpen);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.invalidFileType = false;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const validFileTypes = ['image/jpeg', 'image/png'];
      if (!validFileTypes.includes(file.type)) {
        this.invalidFileType = true;
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public onCreateProduct(): void {
    this.eventSaveProduct.emit(this.editedProduct);
    this.closeModal();
    console.log("Product to create: ", this.editedProduct);
    console.log("isCreating: ", this.isCreating);
  }

  public onSubmit(): void {
    const formData = new FormData();

    formData.append('name', this.editedProduct.name);
    formData.append('price', this.editedProduct.price.toString());
    formData.append('volume', this.editedProduct.volume);
    formData.append('container', this.editedProduct.container);
    formData.append('material', this.editedProduct.material);
    formData.append('oldImage', this.editedProduct.image);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productListService.updateProductWithImage(this.product._id, formData).subscribe({
      next: (updatedProduct) => {
        console.log("Product updated successfully", updatedProduct);
        this.productListService.updateLocalProduct(updatedProduct);
        this.productListService.fetchProducts();
        this.closeModal();
      },
      error: (error) => {
        console.error("Error updating product", error);
      }
    });
  }
}
