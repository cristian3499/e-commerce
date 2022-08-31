import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConexion } from 'src/app/services/global';
import { ProductsService } from 'src/app/services/products.service';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-varieties-product',
  templateUrl: './varieties-product.component.html',
  styleUrls: ['./varieties-product.component.css']
})
export class VarietiesProductComponent implements OnInit {

  public product : any = {};
  public id;
  public token;
  public loading = true;
  public newVarieties = '';
  public loadingBtn = false
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
      )
     }

  ngOnInit(): void {

  }

  addVarieties(){
    if (this.newVarieties) {
      this.product.varieties.push({
        titleVarieties : this.newVarieties
      })
      this.newVarieties = '';

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Necesitas completar el campo de varidad',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  delateVarieties(idx){
    this.product.varieties.splice(idx, 1)
  }

  updateVarieties(){
    if (this.product.titleVarieties) {
      if (this.product.varieties.length >= 1 ) {
        this.loadingBtn = true
        this._prodcutService.updateVarieties({
          titleVarieties : this.product.titleVarieties,
          varieties : this.product.varieties
        }, this.id, this.token).subscribe({
          next : response => {
            iziToast.success({
              title: 'Okay',
              position: 'topRight',
              message: 'Variedades actualizadas',
              overlayClose: true,
              animateInside: true,
            });
            this.loadingBtn = false
          },
          error : err =>{
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: 'Hubo un problema al agregar el regitro',
              overlayClose: true,
              animateInside: true,
            });
          }
        })
      }else{
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Se debe agergar al menos una varidad',
          overlayClose: true,
          animateInside: true,
        });
      }
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Necesitas agregar el titulo de la variedad',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
