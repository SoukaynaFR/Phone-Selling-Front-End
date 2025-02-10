import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuVisible: boolean = false;
  cartItems: any[] = [];
  isLoggedIn: boolean = false;
  searchQuery: any;
  isCartVisible: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private eRef: ElementRef
  ) {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    setTimeout(() => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.isMenuVisible = false;
        this.isCartVisible = false;
      }
    }, 0);
  }

  ngOnInit() {
    // Fetch cart items if needed
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // Redirect to the search results page with the query
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
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
