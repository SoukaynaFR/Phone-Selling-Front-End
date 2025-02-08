import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartItems: any[] = [];
  searchQuery: string = ''; // Holds the search input

  constructor(private router: Router) {}

  ngOnInit() {
    // Fetch cart items if needed
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // Redirect to the search results page with the query
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
}
