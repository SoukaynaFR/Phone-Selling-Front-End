import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';  // Import ApiService
import { MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { BestOffersModule } from '../best-offers/best-offers.module';

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
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private apiService: ApiService, 
    private cartService: CartService, 
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Récupérer l'ID du produit à partir de l'URL
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId).subscribe((product) => {
      
      this.product = product;
    });

    // Charger les produits similaires, si nécessaire
    // this.productService.getRelatedProducts(productId).subscribe((related) => {
    //   this.relatedProducts = related;
    // });
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
    if (!this.product || !this.product.id) {
      console.error("Produit invalide !");
      return;
    }
  
    this.apiService.addItemToCart(this.product.id, this.quantity).subscribe({
      next: (response) => {
        console.log("Réponse complète de l'API :", response);
        if (response.status === 200) {
          console.log("Produit ajouté avec succès !");
          this.messageService.add({
            severity: 'success',
            summary: 'Ajouté au panier',
            detail: 'Le produit a été ajouté à votre panier.',
          });
          this.updateCart(); // Mets à jour l'affichage du panier
        } else {
          console.error("Problème avec l'ajout au panier, statut :", response.status);
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de l\'ajout au panier.',
        });
        console.error("Erreur lors de l'ajout au panier :", err);
        console.error("Détails de l'erreur :", err.error); // Affiche la réponse réelle
      }
    });
  }
  
  updateCart(): void {
    console.log("Rafraîchissement du panier...");
  }  
}
