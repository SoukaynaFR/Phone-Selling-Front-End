import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private apiUrl = '/api/cart';

  constructor(private http: HttpClient) {}

  getCartItems() {
    return this.cartItems;
  }

  // addToCart(item: CartItem): void {
  //   const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
  //   if (existingItem) {
  //     existingItem.quantity += item.quantity;
  //   } else {
  //     this.cartItems.push(item);
  //   }
  // }


   // Add an item to the cart
   addToCart(item: CartItem): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, item);
  }


  // Remove an item from the cart
  removeItemFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  // Update the quantity of an item in the cart
  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }
}

