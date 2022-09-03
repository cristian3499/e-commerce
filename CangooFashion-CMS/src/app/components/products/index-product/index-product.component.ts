import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalConexion } from 'src/app/services/global';
import { ProductsService } from 'src/app/services/products.service';
import {Workbook} from 'exceljs';
import * as fs from 'file-server'

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {

  public loading = true;
  public token;
  public filter = ''
  public products : Array<any> = [];
  public exportProducts : Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 5;
  public loadingBtn = false

  constructor(
    private _productService : ProductsService,
    private _apiService : ApiService
  ) {
    this.token = this._apiService.getToken();
    this.url = GlobalConexion.url
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._productService.getProduct(this.filter, this.token).subscribe({
      next : response => {
        this.products = response.data
        this.products.forEach(elemt => {
          this.exportProducts.push({
            title : elemt.title,
            stock : elemt.stock,
            price : elemt.price,
            category : elemt.category,
            nVentas : elemt.nVentas
          });
        })

        this.loading = false;
      },
      error: err => {
        console.log(err);

      }
    })
  }

  filterProductName(){
    if (this.filter) {
      this._productService.getProduct(this.filter, this.token).subscribe({
        next : response => {
          this.products = response.data
          this.loading = false;
        },
        error: err => {
          console.log(err);

        }
      })
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Ingrese el titulo del producto para filtrar',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  resetProductName(){
    this.filter = ''
    this.initData();
  }

  deleteProduct(id){
    this.loadingBtn = true
    this._productService.deleteProduct(id, this.token).subscribe({
      next: response => {
        iziToast.success({
          title: 'OKAY',
          position: 'topCenter',
          message: 'Cliente eliminado correctamente',
          overlayClose: true,
          animateInside: true,
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadingBtn = false
        this.initData();
      },
      error: err => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#CD0303',
          class: 'text-danger',
          position: 'topCenter',
          message: 'Error al intentar borrar el cliente',
          color: 'red', // blue, red, green, yellow,
          overlayClose: true,
          animateInside: true,
        });
        this.loadingBtn = false
      }
    })
  }

  /* exportExcel(){
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for(let x1 of this.exportProducts){
      let x2 = Object.keys(x1);

      let temp = [];
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    let fname = 'REP01- ';

    worksheet.columns = [
      {header : 'Producto', key : 'col1', width : 30},
      {header : 'Stock', key : 'col2', width : 15},
      {header : 'Precio', key : 'col3', width : 15},
      {header : 'Categoria del producto', key : 'col4', width : 25},
      {header : 'N° de ventas', key : 'col5', width : 15}
    ] as any;
  } */

}
