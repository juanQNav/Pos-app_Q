import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private _token: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<JSON>(this.apiUrl, {
      "username": username,
      "password": password
    });
  }

  public saveToken(token: string) {
    localStorage.setItem('authToken', token);
    this._token = token;
  }

  public getToken(): string {
    return this._token || localStorage.getItem('authToken') || '';
  }

  public logout() {
    localStorage.removeItem('authToken');
    this._token = '';
  }


  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== '';
  }
}
