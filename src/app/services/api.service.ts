import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  addItemToCart(productId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/item/add?productId=${productId}&quantity=${quantity}`;
    return this.http.get(url, { observe: 'response' }); // Ajout de observe: 'response'
  }
  
  
}
