import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8081/my-cart';
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** ✅ Récupérer les articles du panier **/
  getCart(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(this.apiUrl, { headers, withCredentials: true });
  }

  updateCart() {
    this.getCart().subscribe((cart) => {
      this.cartItemsSubject.next(cart.items || []);
    });
  }
  

}
