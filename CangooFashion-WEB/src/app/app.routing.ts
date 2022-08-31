import { Routes, RouterModule} from '@angular/router'
import {ModuleWithProviders} from '@angular/core'
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from "./guards/auth.guard";
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AddressComponent } from './components/user/address/address.component';
import { ContactComponent } from './components/contact/contact.component';
import { IndexOrdersComponent } from './components/user/orders/index-orders/index-orders.component';
import { DetailOrdersComponent } from './components/user/orders/detail-orders/detail-orders.component';
const appRoute : Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account/profile', component: ProfileComponent, canActivate : [AuthGuard]},
  {path: 'account/address', component: AddressComponent, canActivate : [AuthGuard]},
  {path: 'account/orders', component: IndexOrdersComponent, canActivate : [AuthGuard]},
  {path: 'account/orders/:id', component: DetailOrdersComponent, canActivate : [AuthGuard]},
  {path: 'carrito', component: CarritoComponent, canActivate : [AuthGuard]},
  {path: 'products', component: IndexProductComponent},
  {path: 'products/category/:category', component: IndexProductComponent},
  {path: 'products/:slug', component: ShowProductComponent},
  {path: 'contact', component: ContactComponent},

];

export const appRoutingProviders :  any[] = [];
export const routing :  ModuleWithProviders<any> = RouterModule.forRoot(appRoute)
