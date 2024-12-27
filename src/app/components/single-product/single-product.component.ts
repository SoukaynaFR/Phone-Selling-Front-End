import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  @Output() addProductToCart = new EventEmitter<{ product: any; quantity: number }>();

  product: any = {};  // Holds the product details
  relatedProducts: any[] = [];  // List of related products
  productId: string | null = null;
  quantity: number = 1; // Default quantity
  cartItems: CartItem[] = [];


  constructor(private route: ActivatedRoute, private cartService: CartService, private messageService: MessageService) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');  // Get product ID from route parameters

    // Fetch product details (replace with actual data fetching)
    this.fetchProductDetails(productId);
    this.fetchRelatedProducts();
    this.cartItems = this.cartService.getCartItems();

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
          battery: '3095 mAh'
        },
        image: 'assets/Apple_iphone13.png'
      };
    }
  }

  fetchRelatedProducts() {
    // Example related products (replace with real API call)
    this.relatedProducts = [
      { id: '2', name: 'Samsung Galaxy S21', price: 799, image: 'https://via.placeholder.com/250x150' },
      { id: '3', name: 'Google Pixel 6', price: 749, image: 'https://via.placeholder.com/250x150' }
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
    const product: CartItem = {
      id: this.product.id,  
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,  
      image: this.product.image
    };
  
    this.cartService.addToCart(product);
    this.cartItems = this.cartService.getCartItems(); 
    console.log('Item added to cart:', this.cartItems);

    this.messageService.add({
      severity: 'success',
      summary: 'Ajouté au panier',
      detail: 'Le produit a été ajouté à votre panier.',
    });
  }
  

  removeFromCart(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  }
}
