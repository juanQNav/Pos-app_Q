import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../layouts/side-menu/side-menu.component';
import { HeaderComponent } from '../layouts/header/header.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent,HeaderComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {

}
