import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component'; // Import the LandingPageComponent
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './components/./cart/cart.component';
import { CheckoutComponent } from './components/./checkout/checkout.component';
import { SearchComponent } from './pages/search/search.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { ProductsComponent } from './Admin/products/products.component';
import { AdminComponent } from './Admin/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      { path: 'product/:id', component: SingleProductComponent },
      { path: 'search', component: SearchComponent },
      { path: 'cart', component: CartComponent },

      { path: 'checkout', component: CheckoutComponent },

      /*{ path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },*/
    ],
  },
  {path: 'admin',
  component: AdminComponent,
  children: [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]
},
{ path: '', redirectTo: '/admin', pathMatch: 'full' },




  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
