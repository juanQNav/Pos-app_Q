import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private authService: AuthService, private router: Router) { }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
