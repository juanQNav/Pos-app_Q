import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-modal-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent {
  @Input() isOpen: boolean = false;
  @Input() product: Product = {
    id: -1,
    name: '',
    price: -1,
    volume: '',
    image: '',
    container: '',
    material: ''
  };
  @Output() eventCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() save: EventEmitter<Product> = new EventEmitter();

  public previewUrl: string | null = null;
  private selectedFile: File | null = null;
  public invalidFileType: boolean = false;

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
    if (this.selectedFile) {
      this.product.image = `/images/products/${this.selectedFile.name}`;
    }
    this.closeModal();
  }
}
