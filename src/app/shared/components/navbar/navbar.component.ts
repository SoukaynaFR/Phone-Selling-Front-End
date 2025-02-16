import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuVisible: boolean = false;
  cartItems: any[] = [];
  isLoggedIn: boolean = false;
  searchQuery: any;
  isCartVisible: boolean = false;
  private authSubscription!: Subscription;
  private cartSubscription!: Subscription;



  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private eRef: ElementRef
  ) {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.cartService.updateCart();
      }
    });

    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart.items || []; // Assuming `cart.items` contains the list of cart items
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      !this.eRef.nativeElement.contains(event.target) &&
      !(event.target as HTMLElement).classList.contains('toggle-menu') &&
      !(event.target as HTMLElement).classList.contains('toggle-cart')
    ) {
      this.isMenuVisible = false;
      this.isCartVisible = false;
    }
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
    this.isMenuVisible = false;
        localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();    
    this.cartSubscription.unsubscribe();

  }
}

