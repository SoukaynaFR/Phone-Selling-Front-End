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
searchQuery: any;

  constructor(private cartService: CartService, private router: Router) { 
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  ngOnInit() {
    // Fetch cart items if needed
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // Redirect to the search results page with the query
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
  goToLogin() {
    this.router.navigate(['/login']); 
  }

  logout() {
    localStorage.removeItem('token'); 
    this.isLoggedIn = false;
  }
}
