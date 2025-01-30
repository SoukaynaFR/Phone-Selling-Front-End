import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartItems: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private cartService: CartService, private router: Router) { 
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }

  logout() {
    localStorage.removeItem('token'); 
    this.isLoggedIn = false;
  }
}
