import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductService } from './services/product.service';
import { AllProductsComponent } from './components/all-products/all-products.component'

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
    RegisterComponent,
    LoginComponent,
    AllProductsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ProductService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
