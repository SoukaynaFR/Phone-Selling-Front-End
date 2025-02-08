import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'iPhone 14', company: 'Apple', category: 'Electronics', price: 999 },
    { id: 2, name: 'Galaxy S23', company: 'Samsung', category: 'Electronics', price: 850 },
    { id: 3, name: 'Redmi Note 12', company: 'Xiaomi', category: 'Electronics', price: 300 }
  ];

  newProduct = { id: 0, name: '', company: '', category: '', price: 0 };
  showAddProductForm = false;

  addProduct() {
    this.newProduct.id = this.products.length + 1;
    this.products.push({ ...this.newProduct });
    this.newProduct = { id: 0, name: '', company: '', category: '', price: 0 };
    this.showAddProductForm = false;
  }

  editProduct(product: any) {
    alert(`Editing product: ${product.name}`);
    // Add your logic here to open a form and update the product details
  }

  deleteProduct(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.products = this.products.filter(product => product.id !== id);
    }
  }
}
