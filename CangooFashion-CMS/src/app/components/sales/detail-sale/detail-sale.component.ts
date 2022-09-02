import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalConexion } from 'src/app/services/global';

declare const iziToast;

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.component.html',
  styleUrls: ['./detail-sale.component.css']
})
export class DetailSaleComponent implements OnInit {

  public url
  public token
  public order : any = {}
  public details : Array<any> = []
  public loadData = true
  public loadingBtn
  public id

  public review : any = {}

  constructor(private _route : ActivatedRoute, private _adminService : ApiService, private _router : Router) {
    this.url = GlobalConexion.url
    this.token = localStorage.getItem('token')
    this._route.params.subscribe(
      params => {
        this.id = params['id']

        this.initData()
      }
    )
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._adminService.getOrderDetailsClient(this.id, this.token).subscribe({
      next : response => {
        if (response.data != undefined) {
          this.order = response.data
          this.details = response.details
          this.loadData = false
        }else{
          this.order = undefined
        }
        console.log(this.details);


      },
      error : err => {
        console.log(err);

      }
    })
  }

  updateStatus(updateForm){
    if (updateForm.valid) {
      this.loadingBtn = true

      this._adminService.updateStatus(this.id, this.order, this.token).subscribe({
        next: response => {
          console.log(response);

          iziToast.success({
            title: 'OKAY',
            position: 'topCenter',
            message: 'Estado actualizado',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false
          this._router.navigate(['/panel/sales'])
        },
        error: err => {
          console.log(err);

          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Error al cambiar el estado',
            overlayClose: true,
            animateInside: true,
          });
        }
      })


    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Debes elegir un estado a asignar',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
