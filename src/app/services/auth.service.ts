import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap ,BehaviorSubject  } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8081'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient , private router:Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

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
        this.isLoggedInSubject.next(true);
      } else {
        console.error('Aucun token reçu dans la réponse.');
      }
    })
  );

}


  
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']); 
    this.isLoggedInSubject.next(false);

  }

 
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
