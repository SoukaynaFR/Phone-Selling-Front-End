import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {
    name: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    image:'',
    inventory: 0
  };
  file: any = File;
  selectedProduct: any = null;  // Holds the product being edited
  showAddProductForm = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();  // Fetch the products on component initialization
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        console.log('Products loaded:', products);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  deleteProduct(productId: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.loadProducts();  // Refresh the product list
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }


  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.category) {
    
        this.productService.addProduct(this.newProduct).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.productService.uploadImage(response.id , this.newProduct.image).subscribe(
            () => {
              console.log('Image uploaded successfully');
              this.showAddProductForm = false;
              this.newProduct = { name: '', brand: '', category: '', description: '', price: 0, inventory: 0 };  // Reset form
              this.loadProducts();
            },
            (error) => {
              console.error('Error uploading image:', error);
            }
          );

        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Please fill in all required fields.');
    }
  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      this.newProduct.image = event.target.files[0];
      console.log(this.newProduct.image)
    } else {
      return;
    }
  }

  editProduct(product: any) {
    this.selectedProduct = { ...product };  // Clone the product to avoid modifying the original before saving
  }

  updateProduct() {
    if (!this.selectedProduct) return;

    this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.selectedProduct = null;  // Hide the edit form
        this.loadProducts();  // Refresh the product list
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}
