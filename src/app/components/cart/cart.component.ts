import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // ✅ Écouter les changements du panier
    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });

    // ✅ Écouter les changements de prix total
    this.cartService.totalPrice$.subscribe((price: number) => {
      this.totalPrice = price;
    });

    // Charger le panier au début
    this.cartService.updateCart();
  }

  // ✅ Supprimer un article du panier
  removeItemFromCart(itemId: number): void {
    this.cartService.removeItemFromCart(itemId);
  }

  // ✅ Mettre à jour la quantité d'un article
  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  // ✅ Calculer le prix total
  private calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
