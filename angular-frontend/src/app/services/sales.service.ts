import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'http://localhost:8080/api/sales';
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  // Enviar la venta al backend
  createSale(saleData: any): Observable<any> {
    return this.http.post(this.apiUrl, saleData, {
      headers: {
        "Authorization": this.authService.getToken(),
      }
    });
  }
}
