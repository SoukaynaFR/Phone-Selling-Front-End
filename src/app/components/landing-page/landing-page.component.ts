import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { BestOffersModule } from '../best-offers/best-offers.module';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  products: any[] = [];
  bestOffers: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [
    'Smartphones',
    'Tablettes',
    'Écouteurs et Casques',
    'Chargeurs et Batteries',
    'Montres connectées',
  ];
  selectedCategory: string = '';
  priceRange: number = 0;
  quantity: number = 1; // Default quantity
  cart: any;
  product: any = {};
  productId: string | null = null;
  imageUrls: { [key: number]: string } = {};

  constructor(
    private productService: ProductService,
    private router: Router,
    private apiService: ApiService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      // Traitement des données pour ajouter l'imageUrl
      // this.products = data.map(product => {
      //   return {
      //     ...product,
      //     imageUrl: product.download_url || 'https://img.freepik.com/free-photo/blank-phone-screen-purple-background_53876-143196.jpg?uid=R87884697&semt=ais_hybrid'  // Image par défaut si aucune URL n'est fournie
      //   };
      // });
      this.products = data;
      this.loadImages();
      this.filteredProducts = this.products;
      this.filteredProducts = this.products;
      this.loadBestOffers();
    });
  }

goToAdmin(){
  this.router.navigate(['/admin/dashboard']); 

}
  loadImages() {
    this.products.forEach((product) => {
      if (product.images?.length > 0) {
        const image = product.images[0];
        this.productService.getImageBlob(image.downloadUrl).subscribe(
          (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageUrls[product.id] = reader.result as string;
            };
            reader.readAsDataURL(blob); // Convertir le Blob en Data URL
          },
          (error) => {
            console.error("Erreur lors du chargement de l'image", error);
          }
        );
      }
    });
  }
  loadBestOffers() {
    this.productService.getRandomProducts(16).subscribe({
      next: (products) => {
        this.bestOffers = products;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      },
    });
  }
  filterByCategory(category: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.category === category
    );
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory
        ? product.category === this.selectedCategory
        : true;
      const matchesPrice = this.priceRange
        ? product.price <= this.priceRange
        : true;
      return matchesCategory && matchesPrice;
    });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  // Exemple d'assignation de produit avant l'appel à addToCart()
  selectProduct(product: any) {
    this.product = product; // Assigne le produit sélectionné
    this.quantity = 1; // Si tu gères aussi la quantité
  }

  addToCart(): void {
    if (!this.product || !this.product.id) {
      console.error('Produit invalide !');
      return;
    }

    this.apiService.addItemToCart(this.product.id, this.quantity).subscribe({
      next: (response) => {
        console.log("Réponse complète de l'API :", response);
        if (response.status === 200) {
          console.log('Produit ajouté avec succès !');
          this.messageService.add({
            severity: 'success',
            summary: 'Ajouté au panier',
            detail: 'Le produit a été ajouté à votre panier.',
          });
          this.updateCart(); // Mets à jour l'affichage du panier
        } else {
          console.error(
            "Problème avec l'ajout au panier, statut :",
            response.status
          );
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Une erreur est survenue lors de l'ajout au panier.",
        });
        console.error("Erreur lors de l'ajout au panier :", err);
        console.error("Détails de l'erreur :", err.error);
      },
    });
  }

  prevSlide() {
    const carousel = document.querySelector('.carousel-inner') as HTMLElement;
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  nextSlide() {
    const carousel = document.querySelector('.carousel-inner') as HTMLElement;
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  goToAllProducts() {
    this.router.navigate(['/all-products']); // Assurez-vous que la route "/products" existe
  }

  updateCart(): void {
    console.log('Rafraîchissement du panier...');
  }
}
