import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {
    // For testing purposes, directly set the token here
    localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZXhwIjoxNzM2NDU3NDAyLCJzdWIiOiJzb3VrQGdtYWlsLmNvbSIsImVtYWlsIjoic291a0BnbWFpbC5jb20iLCJub20iOiJmciJ9.dcI3tDzu2G_KFbiqu4FhK180UXJEmrPGa0n73OCLop8');
  }

  // addItemToCart(productId: number, quantity: number): Observable<any> {
  //   const token = localStorage.getItem('authToken');  // Retrieve token from localStorage

  //   if (!token) {
  //     throw new Error('No authentication token found');
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const params = { productId: '1', quantity: '1' };

  //   return this.http.get(`${this.baseUrl}/item/add`, { headers, params });
  // }

  addItemToCart(productId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/item/add?productId=${productId}&quantity=${quantity}`;
    return this.http.get(url);
  }
  
}
