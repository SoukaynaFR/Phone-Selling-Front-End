import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  products: any[] = [];
  bestOffers: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = ['Smartphones', 'Tablettes', 'Écouteurs et Casques', 'Chargeurs et Batteries', 'Coques et Protection', 'Montres connectées'];
  selectedCategory: string = '';  // Add selectedCategory
  priceRange: number = 0;

  constructor(private productService: ProductService,private router: Router) {}


  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      // Traitement des données pour ajouter l'imageUrl
      this.products = data.map(product => {
        return {
          ...product,
          imageUrl: product.download_url || 'https://img.freepik.com/free-photo/blank-phone-screen-purple-background_53876-143196.jpg?uid=R87884697&semt=ais_hybrid'  // Image par défaut si aucune URL n'est fournie
        };
      });
      this.filteredProducts = this.products; // Afficher tous les produits par défaut
    });

  }

  filterByCategory(category: string) {
    this.filteredProducts = this.products.filter(product => product.category === category);
  }

  filterProducts() {
    // If you want to filter by both category and price, update the logic here
    this.filteredProducts = this.products.filter(product => {
      return (this.selectedCategory ? product.category === this.selectedCategory : true) && 
             (this.priceRange ? product.price <= this.priceRange : true);
    });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);  // Navigation vers /product/:id
  }
  prevSlide() {
    // Implement your previous slide logic here
  }

  nextSlide() {
    // Implement your next slide logic here
  }
}
