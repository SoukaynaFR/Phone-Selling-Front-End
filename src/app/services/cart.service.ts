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

  /** ✅ Mettre à jour le panier et recalculer le prix total **/
  updateCart(): void {
    this.getCart().subscribe(cart => {
      const items = cart.items || [];
      this.cartItemsSubject.next(items);
      this.calculateTotalPrice(items);
    });
  }

  /** ✅ Supprimer un article du panier **/
  removeItemFromCart(itemId: number): void {
    const url = `http://localhost:8081/Item/delete/${itemId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.delete(url, { headers, withCredentials: true }).subscribe(() => {
      this.updateCart(); // Mettre à jour après suppression
    });
  }

  /** ✅ Mettre à jour la quantité d'un article **/
  updateQuantity(itemId: number, quantity: number): void {
    const url = `${this.apiUrl}/update`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(url, { itemId, quantity }, { headers, withCredentials: true })
      .subscribe(() => {
        this.updateCart(); // Mettre à jour après modification
      });
  }

  /** ✅ Calculer le prix total du panier **/
  private calculateTotalPrice(cartItems: any[]): void {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalPriceSubject.next(total);
  }
}
