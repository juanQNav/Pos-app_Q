import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.css'],
})
export class ModalPaymentComponent {
  @Input() isOpen: boolean = false;
  @Input() totalPrice: number = 0;
  @Input() change: number | null = null;
  @Input() error: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmPayment = new EventEmitter<number>();
  @Output() tryAgain = new EventEmitter<void>();


  paymentAmount: number = 0;

  handleConfirm(): void {
    this.confirmPayment.emit(this.paymentAmount);
  }

  handleClose(): void {
    this.paymentAmount = 0;
    this.error = null;
    this.closeModal.emit();
  }

  handleTryAgain(): void {
    this.error = null;
    this.tryAgain.emit();
  }
}
