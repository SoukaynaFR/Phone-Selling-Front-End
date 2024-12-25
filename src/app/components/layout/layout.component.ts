import { Component } from '@angular/core';
import { CartService, CartItem } from 'src/app/services/cart.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',

})
export class LayoutComponent {
  cart: any[] = [];
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }
}
