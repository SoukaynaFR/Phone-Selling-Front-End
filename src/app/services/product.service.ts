import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/product'; // Assure-toi que ton backend tourne sur ce port

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Récupérer les produits par catégorie
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }



  getProductById(id: number){
    return this.http.get(`${this.apiUrl}/getbyid/${id}`);
  }
}
