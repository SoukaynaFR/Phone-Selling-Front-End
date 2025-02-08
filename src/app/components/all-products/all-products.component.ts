import { Component ,OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = ['Smartphones', 'Tablettes', 'Écouteurs et Casques', 'Chargeurs et Batteries', 'Coques et Protection', 'Montres connectées'];
  selectedCategory: string = '';  
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
        this.filteredProducts = this.products;
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

}
