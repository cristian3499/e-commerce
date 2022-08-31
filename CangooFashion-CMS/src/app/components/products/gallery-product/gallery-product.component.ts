import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConexion } from 'src/app/services/global';
import { ProductsService } from 'src/app/services/products.service';
import { v4 as uuidv4 } from 'uuid';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-gallery-product',
  templateUrl: './gallery-product.component.html',
  styleUrls: ['./gallery-product.component.css']
})
export class GalleryProductComponent implements OnInit {

  public product : any = {};
  public file? : File = undefined;
  public id;
  public token;
  public loading = true;
  public loadingBtn = false
  public loadingBtnDelete = false
  public url;

  constructor(
    private _roue : ActivatedRoute,
    private _prodcutService : ProductsService) {
      this.url = GlobalConexion.url
      this.token = localStorage.getItem('token')
      this._roue.params.subscribe(
        params => {
          this.id = params['id']
          console.log(this.id);

          this.intData();
        }
      )
    }

intData(){
  this._prodcutService.getProductById(this.id, this.token).subscribe({
    next: response =>{
      if(response.data == undefined){
        this.product = undefined
      }else{
        this.product = response.data
        this.loading = false;
      }
      console.log(this.product);

    },
    error: err => {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Error al encontrar el producto',
        overlayClose: true,
        animateInside: true,
      });

    }
  })
}

  ngOnInit(): void {
  }

  fileChangeEvent(event : any) : void{
    var file;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0]

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Error al cargar la imagen',
        overlayClose: true,
        animateInside: true,
      });
      this.file = undefined
    }

    if (file.size <= 4000000) {
      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'image/webp') {
        this.file = file
      }else{
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'El tipo de imagen no coincide.',
          overlayClose: true,
          animateInside: true,
        });
        $('#inp-image').val('')
        this.file = undefined
      }
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Imagen mayor a 4MB',
        overlayClose: true,
        animateInside: true,
      });
      $('#inp-image').val('')
      this.file = undefined
    }
    console.log(this.file);

  }

  addImage(){
    if (this.file != undefined) {
      let data = {
        image : this.file,
        _id : uuidv4()
      }

      this._prodcutService.addGalleryImage(this.id, data, this.token).subscribe({
        next : response => {
          iziToast.success({
            title: 'OKAY',
            position: 'topRight',
            message: 'Imagen agregada correctamente',
            overlayClose: true,
            animateInside: true,
          });
          this.intData();
          $('#inp-image').val('')
        },
        error: err => {
          console.log(err);
          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: 'Error al subir la imagen',
            overlayClose: true,
            animateInside: true,
          });
        }
      })
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Debe seleccionar una imagen',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  deleteImageGallery(id){
    this.loadingBtnDelete = true
    this._prodcutService.deleteGalleryImage(this.id, {_id : id},this.token).subscribe({
      next: response => {
        iziToast.success({
          title: 'OKAY',
          position: 'topRight',
          message: 'Imagen eliminada correctamente',
          overlayClose: true,
          animateInside: true,
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadingBtnDelete = false
        this.intData();
      },
      error: err => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#CD0303',
          class: 'text-danger',
          position: 'topRight',
          message: 'Error al intentar borrar el cliente',
          color: 'red', // blue, red, green, yellow,
          overlayClose: true,
          animateInside: true,
        });
        this.loadingBtn = false
      }
    })
  }

}
