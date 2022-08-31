import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-index-sale',
  templateUrl: './index-sale.component.html',
  styleUrls: ['./index-sale.component.css']
})
export class IndexSaleComponent implements OnInit {

  public token
  public desde
  public hasta
  public sales : Array<any> = []
  public page = 1;
  public pageSize = 5;

  constructor(private _adminServices : ApiService) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this._adminServices.salesHistory(this.desde, this.hasta, this.token).subscribe({
      next : response => {
        this.sales = response.data
      },
      error : err => {
        console.log(err);

      }
    })
  }

  filterForDate(){
    this._adminServices.salesHistory(this.desde, this.hasta, this.token).subscribe({
      next : response => {
        this.sales = response.data

      },
      error : err => {
        console.log(err);

      }
    })
  }

}
