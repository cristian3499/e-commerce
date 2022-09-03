import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';

declare const $:any;
declare var iziToast;

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css']
})
export class DetailOrdersComponent implements OnInit {

  public url
  public token
  public order : any = {}
  public details : Array<any> = []
  public loadData = true
  public loadingBtn
  public id

  public review : any = {}

  constructor(private _clientService : ClientService, private _route : ActivatedRoute) {
    this.url = GlobalConexion.url
    this.token = localStorage.getItem('token')
    this._route.params.subscribe(
      params => {
        this.id = params['id']

        this._clientService.getOrderDetailsClient(this.id, this.token).subscribe({
          next : response => {

            if (response.data != undefined) {
              this.order = response.data
              this.details = response.details
              this.loadData = false
            }else{
              this.order = undefined
            }

          },
          error : err => {
            console.log(err);

          }
        })
      }
    )
  }

  ngOnInit(): void {
  }

  openModal(item){
    this.review = {}
    this.review.product =  item.product._id
    this.review.client = item.client
    this.review.sale = this.id

  }

  emitirReview(){
    if (this.review.review) {

    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
