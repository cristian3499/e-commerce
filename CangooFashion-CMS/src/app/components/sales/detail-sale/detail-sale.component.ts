import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalConexion } from 'src/app/services/global';

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

  constructor(private _route : ActivatedRoute, private _adminService : ApiService) {
    this.url = GlobalConexion.url
    this.token = localStorage.getItem('token')
    this._route.params.subscribe(
      params => {
        this.id = params['id']

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
    )
  }

  ngOnInit(): void {
  }

}
