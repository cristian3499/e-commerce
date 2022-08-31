import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product : any = {};
  public file? : File = undefined;
  public imgSelected : any | ArrayBuffer = 'assets/img/01.jpg'
  public config : any = {};
  public token;
  public loadingBtn = false
  public configuration : any ={}

  constructor(private _prodcutService : ProductsService, private _apiService : ApiService, private _router :Router) {
    this.config = {
      height: 500
    }
    this.token =  this._apiService.getToken();
    this._apiService.getConfigPublic().subscribe({
      next : response => {
        this.configuration = response.data
        console.log(this.configuration);

      }
    })
  }

  ngOnInit(): void {
  }

  registerProduct(registerForm){
    if (registerForm.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topCenter',
          message: 'Se necesita subir una portada',
          overlayClose: true,
          animateInside: true,
        });
      }else{
        this.loadingBtn = true
        this._prodcutService.registerProduct(this.product, this.file, this.token).subscribe({
          next: reponse => {
            iziToast.success({
              title: 'Okay',
              position: 'topCenter',
              message: 'Producto creado',
              overlayClose: true,
              animateInside: true,
            });
            this.loadingBtn = false
            this._router.navigate(['/panel/products'])
          },
          error: err => {
            iziToast.error({
              title: 'ERROR',
              position: 'topCenter',
              message: 'Error al agregar el product',
              overlayClose: true,
              animateInside: true,
            });
            this.loadingBtn = false
          }
        })
      }

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Verifica los datos del formulario',
        overlayClose: true,
        animateInside: true,
      });
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
