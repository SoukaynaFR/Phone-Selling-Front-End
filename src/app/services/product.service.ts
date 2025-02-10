import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/product';

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getRandomProducts(count: number): Observable<any[]> {
    return this.getAllProducts().pipe(
      map(products => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      })
    );
  }

  // Récupérer les produits par catégorie
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }



  getProductById(id: number){
    return this.http.get(`${this.apiUrl}/getbyid/${id}`);
  }
}
