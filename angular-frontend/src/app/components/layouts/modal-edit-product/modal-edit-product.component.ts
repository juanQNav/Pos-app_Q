import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() eventCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() save: EventEmitter<Product> = new EventEmitter();
  @Input() product: Product = {
    _id: '',
    id: -1,
    name: '',
    price: -1,
    volume: '',
    image: '',
    container: '',
    material: ''
  };
  public previewUrl: string | null = null;
  public selectedFile: File | null = null;
  public invalidFileType: boolean = false;

  constructor(private productListService: ProductListService) { }

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

  public onSubmit(): void {
    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('volume', this.product.volume);
    formData.append('container', this.product.container);
    formData.append('material', this.product.material);

    formData.append('oldImage', this.product.image);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productListService.updateProductWithImage(this.product._id, formData).subscribe({
      next: (updatedProduct) => {
        console.log("Product updated successfully", updatedProduct);
        this.productListService.updateLocalProduct(updatedProduct);
        this.closeModal();
      },
      error: (error) => {
        console.error("Error updating product", error);
      }
    });
  }

}