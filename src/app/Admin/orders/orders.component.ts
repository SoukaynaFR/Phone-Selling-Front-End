import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  products = [
    { id: 1, name: 'Product A', category: 'Category 1', price: 100 },
    { id: 2, name: 'Product B', category: 'Category 2', price: 200 },
    { id: 3, name: 'Product C', category: 'Category 3', price: 300 }
  ];

  viewProduct(id: number) {
    alert(`Viewing product with ID: ${id}`);
  }

  editProduct(id: number) {
    alert(`Editing product with ID: ${id}`);
  }

  deleteProduct(id: number) {
    const confirmDelete = confirm(`Are you sure you want to delete product with ID: ${id}?`);
    if (confirmDelete) {
      this.products = this.products.filter(product => product.id !== id);
      alert('Product deleted successfully.');
    }
  }
}
