import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }


  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/drawer/home']);
        }
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas. Intente de nuevo.';
        console.error('Login error', error);
      }
    );
  }
}
