import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = '/api/products'; // Replace with your actual backend API URL if needed

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Get a single product by ID
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }

  // Get related products by product ID
  getRelatedProducts(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${productId}/related`);
  }
}
