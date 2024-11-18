import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product} from '../../../interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() showAddButton:boolean = true;
  @Input() product: Product ={
    id : -1,
    name: '',
    price:  -1,
    volumen: '',
    image: ''
  }

}
