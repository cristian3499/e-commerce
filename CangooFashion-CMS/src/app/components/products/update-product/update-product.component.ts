import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalConexion } from 'src/app/services/global';
import { ProductsService } from 'src/app/services/products.service';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {

  public product : any = {}
  public file? : File = undefined;
  public imgSelected? : any | ArrayBuffer;
  public config : any = {};
  public token;
  public loadingBtn = false
  public loading = true;
  public id;
  public url;
  public configuration : any ={}

  constructor(
    private _prodcutService : ProductsService,
    private _apiService : ApiService,
    private _router :Router,
    private _roue : ActivatedRoute) {
    this.config = {
      height: 500
    }
    this.token = this._apiService.getToken();
    this.url = GlobalConexion.url
    this._apiService.getConfigPublic().subscribe({
      next : response => {
        this.configuration = response.data

      }
    })
  }

  ngOnInit(): void {
    this._roue.params.subscribe(
      params => {
        this.id = params['id']
        this._prodcutService.getProductById(this.id, this.token).subscribe({
          next: response =>{
            if(response.data == undefined){
              this.product = undefined
              this.loading = false;
            }else{
              this.product = response.data;
              this.imgSelected = this.url + 'getFrontPage/' + this.product.frontPage
              this.loading = false;
            }

          },
          error: err => {
            iziToast.error({
              title: 'ERROR',
              position: 'topCenter',
              message: 'Error al encontrar el producto',
              overlayClose: true,
              animateInside: true,
            });

          }
        })
      }
    )
  }

  updateProduct(updateForm){
    if (updateForm.valid) {
      var data : any = {};

      if (this.file != undefined) {
        data.frontPage  = this.file
      }
      data.title = this.product.title
      data.stock = this.product.stock
      data.price = this.product.price
      data.category = this.product.category
      data.description = this.product.description
      data.context = this.product.context
      this.loadingBtn = true
      this._prodcutService.updateProduct(data, this.id, this.token).subscribe({
        next : response => {
          iziToast.success({
            title: 'Okay',
            position: 'topCenter',
            message: 'Producto actualizado!',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false
          this._router.navigate(['/panel/products'])
        },
        error : err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Error al actualizar el producto',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false
        }
      })

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Verifica que los datos del formulario esten correctos',
        overlayClose: true,
        animateInside: true,
      });
      this.loadingBtn = false
    }

  }

  fileChangeEvent(event : any) : void{
    var file;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0]

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Error al cargar la imagen',
        overlayClose: true,
        animateInside: true,
      });
      $('#input-image-name').text('Seleccionar imagen')
      this.imgSelected = 'assets/img/01.jpg'
      this.file = undefined
    }

    if (file.size <= 4000000) {
      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'image/webp') {
        const reader = new FileReader();
        reader.onload = e => this.imgSelected = reader.result;

        reader.readAsDataURL(file)
        $('#input-image-name').text(file.name)
        this.file = file
      }else{
        iziToast.error({
          title: 'ERROR',
          position: 'topCenter',
          message: 'El tipo de imagen no coincide.',
          overlayClose: true,
          animateInside: true,
        });
        $('#input-image-name').text('Seleccionar imagen')
        this.imgSelected = 'assets/img/01.jpg'
        this.file = undefined
      }
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Imagen mayor a 4MB',
        overlayClose: true,
        animateInside: true,
      });
      $('#input-image-name').text('Seleccionar imagen')
      this.imgSelected = 'assets/img/01.jpg'
      this.file = undefined
    }

  }

}
