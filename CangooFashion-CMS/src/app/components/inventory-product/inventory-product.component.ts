import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
  styleUrls: ['./inventory-product.component.css']
})
export class InventoryProductComponent implements OnInit {

  public product : any = {};
  public id;
  public idUser;
  public token;
  public loading = true;
  public inventory : Array<any> = [];
  public addInventory : any = {};
  public loadingBtn = false

  constructor(
    private _roue : ActivatedRoute,
    private _prodcutService : ProductsService)
    {
    this.token = localStorage.getItem('token')
    this.idUser = localStorage.getItem('_id')
  }

  ngOnInit(): void {
    this._roue.params.subscribe(
      params => {
        this.id = params['id']

        this._prodcutService.getProductById(this.id, this.token).subscribe({
          next: response =>{
            if(response.data == undefined){
              this.product = undefined
            }else{
              this.product = response.data

              this._prodcutService.inventoryProduct(this.product._id, this.token).subscribe({
                next : response => {
                  this.inventory = response.data

                  this.loading = false;
                },
                error : err => {
                  iziToast.error({
                    title: 'ERROR',
                    position: 'topCenter',
                    message: 'Error al encontrar el producto',
                    overlayClose: true,
                    animateInside: true,
                  });
                  this.loading = false;
                }
              })

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

  deleteProduct(id){
    this.loadingBtn = true
    this._prodcutService.deleteInventory(id, this.token).subscribe({
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

        this._prodcutService.inventoryProduct(this.product._id, this.token).subscribe({
          next : response => {
            this.inventory = response.data
          },
          error : err => {
            iziToast.error({
              title: 'ERROR',
              position: 'topCenter',
              message: 'Error al encontrar el producto',
              overlayClose: true,
              animateInside: true,
            });
            this.loading = false;
          }
        })

        this.loading = false;
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

  registerInventory(inventoryForm){
    if (inventoryForm.valid) {

      let data = {
        product : this.product._id,
        quantity : inventoryForm.value.quantity,
        admin : this.idUser,
        supplier : inventoryForm.value.supplier
      }


      this._prodcutService.registerInventary(data, this.token).subscribe({
        next : response => {
          iziToast.success({
            title: 'OKAY',
            position: 'topCenter',
            message: 'Se actualizo la informacion del producto',
            overlayClose: true,
            animateInside: true,
          });
          this._prodcutService.inventoryProduct(this.product._id, this.token).subscribe({
            next : response => {
              this.inventory = response.data
            },
            error : err => {
              iziToast.error({
                title: 'ERROR',
                position: 'topCenter',
                message: 'Error al encontrar el producto',
                overlayClose: true,
                animateInside: true,
              });
              this.loading = false;
            }
          })

        },
        error: err => {
          console.log(err);

        }
      })

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Los datos del formulario no son validos',
        color: 'red', // blue, red, green, yellow,
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
