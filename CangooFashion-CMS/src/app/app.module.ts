import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {HttpClient, HttpClientModule} from "@angular/common/http"
import { routing } from './app.routing'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClientComponent } from './components/clients/index-client/index-client.component';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { InventoryProductComponent } from './components/inventory-product/inventory-product.component';
import { CreateCouponsComponent } from './components/coupons/create-coupons/create-coupons.component';
import { IndexCouponComponent } from './components/coupons/index-coupon/index-coupon.component';
import { UpdateCouponComponent } from './components/coupons/update-coupon/update-coupon.component';
import { ConfigComponent } from './components/config/config.component';
import { VarietiesProductComponent } from './components/products/varieties-product/varieties-product.component';
import { GalleryProductComponent } from './components/products/gallery-product/gallery-product.component';
import { IndexContactComponent } from './components/contact/index-contact/index-contact.component';
import { IndexOrdersComponent } from './components/user/orders/index-orders/index-orders.component';
import { IndexSaleComponent } from './components/sales/index-sale/index-sale.component';
import { DetailSaleComponent } from './components/sales/detail-sale/detail-sale.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    IndexClientComponent,
    CreateClientComponent,
    EditClientComponent,
    CreateProductComponent,
    IndexProductComponent,
    UpdateProductComponent,
    InventoryProductComponent,
    CreateCouponsComponent,
    IndexCouponComponent,
    UpdateCouponComponent,
    ConfigComponent,
    VarietiesProductComponent,
    GalleryProductComponent,
    IndexContactComponent,
    IndexOrdersComponent,
    IndexSaleComponent,
    DetailSaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      //baseURL: './assets/tinymce/',
      // or cdn
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
