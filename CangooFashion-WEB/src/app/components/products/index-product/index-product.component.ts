import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';
import { io } from 'socket.io-client'

declare var noUiSlider;
declare var $:any;
declare var iziToast;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {

  public configuration : any = {};
  public products : Array<any> = []
  public filterCatgory = '';
  public filterProduct = '';
  public loadData = true;
  public url
  public filterCategoryProducts = 'all'
  public routeCategory;
  public page = 1;
  public pageSize = 9;
  public sortBy = 'Defecto'
  public addCar : any = {
    variety : '',
    quantity : 1
  }
  public token;
  public btnCard = false
  public socket = io('http://localhost:4201')

  constructor(private _clientSerivice : ClientService, private _route : ActivatedRoute) {
    this.token = localStorage.getItem('token')
    this.url = GlobalConexion.url;
    this._clientSerivice.getConfigPublic().subscribe({
      next : response => {
        this.configuration = response.data
        console.log(this.configuration);

      }
    })

    this._route.params.subscribe(
      params => {
        this.routeCategory = params['category']
        if (this.routeCategory) {
          this._clientSerivice.getProductShop('').subscribe({
            next : response => {
              this.products = response.data
              this.products =  this.products.filter(item => item.category.toLowerCase() == this.routeCategory)
              this.loadData = false;
            }
          })
        }else{
          this._clientSerivice.getProductShop('').subscribe({
            next : response => {
              this.products = response.data
              this.loadData = false;
            }
          })
        }
      }
    )
  }

  ngOnInit(): void {
    var slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count',
          values: 5,

        }
    })

    slider.noUiSlider.on('update', function (values) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');
  }

  searchCategory(){
    if (this.filterCatgory) {
      var search = new RegExp(this.filterCatgory, 'i');
      this.configuration.categories = this.configuration.categories.filter(
        item => search.test(item.businessName)
      );
    }else{
      this._clientSerivice.getConfigPublic().subscribe({
        next : response => {
          this.configuration = response.data
          console.log(this.configuration);

        }
      })
    }

  }

  searchProduct(){
    this._clientSerivice.getProductShop(this.filterProduct).subscribe({
      next : response => {
        this.products = response.data;
        this.loadData = false;
      }
    })
  }

  searchByCategory(){
    if (this.filterCategoryProducts == 'all') {
      this._clientSerivice.getProductShop(this.filterProduct).subscribe({
        next : response => {
          this.products = response.data;
          this.loadData = false;
        }
      })
    }else{
      this._clientSerivice.getProductShop(this.filterProduct).subscribe({
        next : response => {
          this.products = response.data;
          this.loadData = false;
          this.products =  this.products.filter(item => item.category == this.filterCategoryProducts)
        }
      })

    }

  }

  resetProducts(){
    this.filterProduct = ''
    this._clientSerivice.getProductShop('').subscribe({
      next : response => {
        this.products = response.data
        this.loadData = false;
      }
    })
  }

  ordenBy(){
    if (this.sortBy == 'Defecto') {
      this._clientSerivice.getProductShop('').subscribe({
        next : response => {
          this.products = response.data
          this.loadData = false;
        }
      })
    }else if(this.sortBy == 'Popularidad'){
      this.products.sort(function (a, b) {
        if (a.nVentas < b.nVentas) {
          return 1
        }if (a.nVentas > b.nVentas) {
          return -1
        }
        return 0
      })
    }else if(this.sortBy == 'mayorMenor'){
      this.products.sort(function (a, b) {
        if (a.price < b.price) {
          return 1
        }if (a.price > b.price) {
          return -1
        }
        return 0
      })
    }else if(this.sortBy == 'menorMayor'){
      this.products.sort(function (a, b) {
        if (a.price > b.price) {
          return 1
        }if (a.price < b.price) {
          return -1
        }
        return 0
      })
    }else if(this.sortBy == 'AZ'){
      this.products.sort(function (a, b) {
        if (a.title > b.title) {
          return 1
        }if (a.title < b.title) {
          return -1
        }
        return 0
      })
    }else if(this.sortBy == 'ZA'){
      this.products.sort(function (a, b) {
        if (a.title < b.title) {
          return 1
        }if (a.title > b.title) {
          return -1
        }
        return 0
      })
    }
  }

  addProduct(product){
    const data = {
      product : product._id,
      client : localStorage.getItem('_id'),
      quantity : 1,
      variety : product.varieties[0].titleVarieties
    }
    this.btnCard = true
    this._clientSerivice.addCart(data, this.token).subscribe({
      next : response => {
        if (response.data == undefined) {
          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: 'El producto ya existe en el carrito',
            overlayClose: true,
            animateInside: true,
          });
          this.btnCard = false
        }else{
          console.log(response);
          iziToast.success({
            title: 'Okay',
            position: 'topRight',
            message: 'Producto agregado',
            overlayClose: true,
            animateInside: true,
          });
          this.socket.emit('addProductCar',{data : true})
          this.btnCard = false
        }
      }
    })
  }

}
