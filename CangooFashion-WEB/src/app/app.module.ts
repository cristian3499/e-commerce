import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {HttpClient, HttpClientModule} from "@angular/common/http"
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { routing } from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SidebarComponent } from './components/user/sidebar/sidebar.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AddressComponent } from './components/user/address/address.component';
import { ContactComponent } from './components/contact/contact.component';
import { IndexOrdersComponent } from './components/user/orders/index-orders/index-orders.component';
import { DetailOrdersComponent } from './components/user/orders/detail-orders/detail-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    SidebarComponent,
    IndexProductComponent,
    ShowProductComponent,
    CarritoComponent,
    AddressComponent,
    ContactComponent,
    IndexOrdersComponent,
    DetailOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    routing,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
