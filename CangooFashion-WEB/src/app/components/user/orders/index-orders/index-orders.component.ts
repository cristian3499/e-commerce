import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';

@Component({
  selector: 'app-index-orders',
  templateUrl: './index-orders.component.html',
  styleUrls: ['./index-orders.component.css']
})
export class IndexOrdersComponent implements OnInit {

  public url
  public token
  public orders : Array<any> = []
  public loadData = true
  public id
  public page = 1;
  public pageSize = 9;

  constructor(private _clientService : ClientService) {
    this.token = localStorage.getItem('token')
    this.url = GlobalConexion.url
    this.id = localStorage.getItem('_id')
   }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._clientService.getOrderClient(this.id, this.token).subscribe({
      next : response => {
        this.orders = response.data
        this.loadData = false
      },
      error : err => {
        console.log(err);

      }
    })
  }

}
