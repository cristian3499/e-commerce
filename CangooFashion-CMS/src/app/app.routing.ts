import { Routes, RouterModule} from '@angular/router'
import {ModuleWithProviders} from '@angular/core'
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from "./guards/admin.guard";
import { IndexClientComponent } from './components/clients/index-client/index-client.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
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
import { IndexSaleComponent } from './components/sales/index-sale/index-sale.component';
import { DetailSaleComponent } from './components/sales/detail-sale/detail-sale.component';

const appRoute : Routes = [
  {path: '', redirectTo : 'inicio', pathMatch : 'full'},
  {path: 'inicio', component: HomeComponent, canActivate : [AdminGuard]},
  {path: 'panel', children:[
    //Clients
    {path: 'clients', component: IndexClientComponent, canActivate: [AdminGuard]},
    {path: 'clients/register', component: CreateClientComponent, canActivate: [AdminGuard]},
    {path: 'clients/:id', component: EditClientComponent, canActivate: [AdminGuard]},

    //Products
    {path: 'products', component: IndexProductComponent, canActivate: [AdminGuard]},
    {path: 'products/register', component: CreateProductComponent, canActivate: [AdminGuard]},
    {path: 'product/:id', component: UpdateProductComponent, canActivate: [AdminGuard]},
    {path: 'product/inventory/:id', component: InventoryProductComponent, canActivate: [AdminGuard]},
    {path: 'product/varieties/:id', component: VarietiesProductComponent, canActivate: [AdminGuard]},
    {path: 'product/gallery/:id', component: GalleryProductComponent, canActivate: [AdminGuard]},

    //Coupons
    {path: 'coupons/register', component: CreateCouponsComponent, canActivate: [AdminGuard]},
    {path: 'coupons', component: IndexCouponComponent, canActivate: [AdminGuard]},
    {path: 'coupons/:id', component: UpdateCouponComponent, canActivate: [AdminGuard]},

    //Configurations
    {path: 'config', component: ConfigComponent, canActivate: [AdminGuard]},

    //Sales
    {path: 'sales', component: IndexSaleComponent, canActivate: [AdminGuard]},
    {path: 'sales/:id', component: DetailSaleComponent, canActivate: [AdminGuard]},

    //Contact
    {path: 'contact', component: IndexContactComponent, canActivate: [AdminGuard]},
  ]},
  {path: 'login', component: LoginComponent}
];

export const appRoutingProviders :  any[] = [];
export const routing :  ModuleWithProviders<any> = RouterModule.forRoot(appRoute)
