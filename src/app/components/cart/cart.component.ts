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
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  // Update the total price whenever the cart items change
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Remove an item from the cart
  removeItemFromCart(itemId: number): void {
    this.cartService.removeItemFromCart(itemId);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items list
    this.calculateTotalPrice(); // Recalculate the total price
  }

  // Update the quantity of an item in the cart
  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items list
    this.calculateTotalPrice(); // Recalculate the total price
  }

  // Proceed to Checkout (to be implemented)
  proceedToCheckout(): void {
    // Logic for checkout, e.g., navigate to a checkout page
  }
}
