import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
    tap((response: any) => {
      console.log(response);
      if (response && response.bearer) {
        localStorage.setItem('token', response.token); 
      } else {
        console.error('Aucun token reçu dans la réponse.');
      }
    })
  );
}


// login(email: string, mdp: string): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}/login`, { email, mdp });
// }

  // Déconnexion (Si tu ajoutes cette fonctionnalité dans ton backend)
  logout(): void {
    localStorage.removeItem('token');
  }

 
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
