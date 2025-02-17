import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  imageUrls: { [key: number]: string } = {};
  
  
  totalPrice: number = 0;
  

  constructor(private productService: ProductService,private cartService: CartService ,private apiService: ApiService ,  private cdr: ChangeDetectorRef) {}

  

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: any) => {
      // this.cartItems = cart.items;  
      this.cartItems = cart.items.sort((a:any, b:any) => a.id - b.id);
      this.loadImages()
      this.totalPrice = cart.totalAmount || 0; 
      this.cartService.updateCart();
    
    });
  
  }

  loadImages() {
    this.cartItems.forEach((item) => {
      if (item.product.images?.length > 0) {
        const image = item.product.images[0];
        this.productService.getImageBlob(image.downloadUrl).subscribe(
          (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageUrls[item.id] = reader.result as string;
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

  
  // ✅ Supprimer un article du panier
  removeItemFromCart(productId: number): void {
    // Appel à la méthode du service pour supprimer l'article
    // console.log(localStorage.getItem('token'));
    // this.apiService.removeItemFromCart(productId);
    this.apiService.removeItemFromCart(productId).subscribe(
      (response) => {
        console.log('Product removed from cart successfully mis à jour avec succès :', response);
        // Vérifier si la réponse contient des erreurs spécifiques
        if (!response || response.error) {
          console.error('Error removing product from cart', response.error);
          return;
        }
  
        this.cartService.getCart().subscribe((cart: any) => {
          this.cartItems = cart.items.sort((a:any, b:any) => a.id - b.id);
          this.totalPrice = cart.totalAmount || 0; 
          this.cartService.updateCart();
        
        });
        // Forcer Angular à détecter les changements
        this.cdr.detectChanges();
      })


  }

  
  // updateItem(productId: number, quantity: number): void {
  //   const token = localStorage.getItem('jwt_token') || ''; // Récupérer le token JWT depuis localStorage
  //   this.apiService.updateCartItem(productId, quantity, token).subscribe(
  //     (response) => {
  //       console.log('Produit mis à jour avec succès :', response);
     
  //         const cartItem = this.cartItems.find(item => item.product.id === productId);
  //         if (cartItem) {
  //           cartItem.quantity = quantity;
  //         }

  //     // Forcer Angular à détecter les changements
  //     this.cdr.detectChanges();

  //     // Recalculer le prix total après mise à jour de la quantité
  //     // this.calculateTotal();
  //       },
  //  (error) => {
  //         console.error('Erreur lors de la mise à jour du produit:', error);
  //       }
     

  //   );
  // }


  updateItem(productId: number, quantity: number): void {
    const token = localStorage.getItem('jwt_token') || ''; 

    this.apiService.updateCartItem(productId, quantity, token).subscribe(
      (response) => {
        console.log('Produit mis à jour avec succès :', response);
        // Vérifier si la réponse contient des erreurs spécifiques
        if (!response || response.error) {
          console.error('Erreur dans la réponse de l\'API', response);
          return;
        }
        // Créer une nouvelle liste de cartItems avec la quantité mise à jour
        this.cartItems = this.cartItems.map(item => {
          if(item.product.id === productId ){
            item.quantity = quantity
          }
          return item
        }
          
          // ? { ...item, quantity }  // Remplacer l'élément avec une nouvelle référence
          // : item
        );
  
        this.cartService.getCart().subscribe((cart: any) => {
          this.cartItems = cart.items.sort((a:any, b:any) => a.id - b.id);
          this.totalPrice = cart.totalAmount || 0; 
          this.cartService.updateCart();
        
        });
        // Forcer Angular à détecter les changements
        this.cdr.detectChanges();
  
        // Recalculer le prix total après mise à jour de la quantité
        // this.calculateTotal();
      },
      // (error) => {
      //   console.error('Erreur lors de la mise à jour du produit:', error);
      // }
    );
  }
  
}
