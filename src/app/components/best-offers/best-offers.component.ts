import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-best-offers',
  templateUrl: './best-offers.component.html',
  styleUrls: ['./best-offers.component.scss'],
})
export class BestOffersComponent {
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
    this.loadBestOffers();
  }

  loadBestOffers() {
    this.productService.getRandomProducts(16).subscribe({
      next: (products) => {
        this.bestOffers = products;
        this.loadImages();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      },
    });
  }

  // Charger les images avec le token
  loadImages() {
    this.bestOffers.forEach((offer) => {
      if (offer.images?.length > 0) {
        const image = offer.images[0];
        this.productService.getImageBlob(image.downloadUrl).subscribe(
          (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageUrls[offer.id] = reader.result as string;
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

  // getImage(imagePath:any){
  //   console.log(imagePath)
  //   return this.productService.getImageUrl(imagePath)
  // }
  // getImage(image: any): string {
  //   console.log("hello")
  //   if (!image || !image.downloadUrl) {
  //     return 'https://img.freepik.com/free-photo/blank-phone-screen-purple-background_53876-143196.jpg?uid=R87884697&semt=ais_hybrid';
  //   }
  //   return this.productService.getImageUrl(image.downloadUrl);
  // }

  viewOffer(productId: number) {
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
}
