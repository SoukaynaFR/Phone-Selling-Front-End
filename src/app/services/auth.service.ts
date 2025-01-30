import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    const url = 'http://localhost:8081/inscription';  // Correct URL
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post(url, userData, { headers });
  }
}
