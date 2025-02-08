import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchComponent } from './pages/search/search.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ProductsComponent } from './Admin/products/products.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { AdminComponent } from './Admin/admin/admin.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    SearchComponent,
    SidebarComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    AdminComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
