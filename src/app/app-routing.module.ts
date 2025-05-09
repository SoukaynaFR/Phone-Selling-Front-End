import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component'; // Import the LandingPageComponent
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './components/./cart/cart.component';
import { CheckoutComponent } from './components/./checkout/checkout.component';


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

      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },

    ],
  },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
