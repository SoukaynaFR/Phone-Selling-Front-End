import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';  // Import ApiService
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  product: any = {};  // Holds the product details
  relatedProducts: any[] = [];  // List of related products
  productId: string | null = null;
  quantity: number = 1; // Default quantity

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,  // Inject ApiService
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');  // Get product ID from route parameters

    // Fetch product details (replace with actual data fetching)
    this.fetchProductDetails(productId);
    this.fetchRelatedProducts();
  }

  fetchProductDetails(productId: string | null) {
    // Example product data (replace with real API call)
    if (productId) {
      this.product = {
        id: productId,
        name: 'iPhone 13',
        description: 'Le dernier modèle d\'iPhone avec une caméra améliorée.',
        price: 999,
        specifications: {
          ram: '6 GB',
          processor: 'A15 Bionic',
          storage: '128 GB',
          battery: '3095 mAh',
        },
        image: 'assets/Apple_iphone13.png',
      };
    }
  }

  fetchRelatedProducts() {
    // Example related products (replace with real API call)
    this.relatedProducts = [
      { id: '2', name: 'Samsung Galaxy S21', price: 799, image: 'https://via.placeholder.com/250x150' },
      { id: '3', name: 'Google Pixel 6', price: 749, image: 'https://via.placeholder.com/250x150' },
    ];
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    // Call the ApiService to add item to cart
    this.apiService.addItemToCart(this.product.id, this.quantity).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Ajouté au panier',
          detail: 'Le produit a été ajouté à votre panier.',
        });
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de l\'ajout au panier.',
        });
      }
    );
  }
}
