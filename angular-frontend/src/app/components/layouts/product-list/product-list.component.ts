import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardComponent, NgClass],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() showAddButton:boolean = true;
  @Input() xlCols:number = 5;
  products = [
    {
      id : 1,
      name: 'Coca-cola',
      price:  19.00,
      volumen: '355ml',
      image: "images/products/sodas/Coca-Cola-355ml.png"
    },
    {
      id : 2,
      name: 'Fanta ',
      price: 25,
      volumen: '1.5L',
      image: "images/products/sodas/Fanta-1.5L.png"
    }, 
    {
      id : 3,
      name: 'Sprite',
      price: 25,
      volumen: '2.5L',
      image: "images/products/sodas/Sprite-2.5L.png"
    },
    {
      id : 4,
      name: 'Fresca',
      price: 35,
      volumen: '2.5L',
      image: "images/products/sodas/Fresca-2.5L.png"
    },
    {
      id : 5,
      name: 'Fanta Fresa',
      price: 35,
      volumen: '2.5L',
      image: "images/products/sodas/Fanta-Fresa-2.5L.png"
    }, 
    {
      id : 6,
      name: 'Sidral Mundet',
      price: 35,
      volumen: '2.5L',
      image: "images/products/sodas/Sidral-Mundet-2.5L.png"
    },
    {
      id : 7,
      name: 'Topo chico Agua Miner.',
      price: 20,
      volumen: '600ml',
      image: "images/products/sodas/Topo-Chico-Agua-Mineral-600ml.png"
    },
    {
      id : 8,
      name: 'Delaware Punch UVA',
      price: 18,
      volumen: '600ml',
      image: "images/products/sodas/Delaware-Punch-UVA-600ml.png"
    }, 
    {
      id : 9,
      name: 'Ciel Agua Purificada',
      price: 14,
      volumen: '1L',
      image: "images/products/sodas/Ciel-Agua-Purificada-1L.png"
    },
    {
      id : 10,
      name: 'Powerade Fruta Roja',
      price: 21,
      volumen: '600ml',
      image: "images/products/sodas/Powerade-Fruta-Roja-600ml.png"
    },
    {
      id : 11,
      name: 'Fuze Tea Durazno',
      price: 18,
      volumen: '600ml',
      image: "images/products/sodas/Fuze-Tea-Durazno-600ml.png"
    }, 
    {
      id : 12,
      name: 'Monster Energy Ori.',
      price: 36,
      volumen: '473ml',
      image: "images/products/sodas/Monster-Energy-Original-473ml.png"
    },
  ]
}
