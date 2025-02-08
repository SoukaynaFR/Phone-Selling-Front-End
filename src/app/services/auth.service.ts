import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8081'; 
  constructor(private http: HttpClient) {}

  // Inscription d'un utilisateur
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inscription`, user);
  }

  // Connexion de l'utilisateur
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Déconnexion (Si tu ajoutes cette fonctionnalité dans ton backend)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Sauvegarde du token JWT
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Récupération du token JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
