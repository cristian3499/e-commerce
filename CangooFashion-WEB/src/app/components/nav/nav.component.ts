import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';
import { io } from 'socket.io-client'

declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token;
  public id;
  public user : any = undefined;
  public userData : any = {};
  public dataUserLC;
  public configuration : any = {}
  public openCart = false
  public url;
  public clientCar : Array<any> = []
  public subtotal = 0
  public socket = io('http://localhost:4201')

  constructor(private _clientService : ClientService, private _router : Router) {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')
    this.url = GlobalConexion.url
    this._clientService.getConfigPublic().subscribe({
      next : response => {
        this.configuration = response.data

      }
    })

    if (this.token) {
      this._clientService.getClientByIdShop(this.id, this.token).subscribe({
        next : response => {
          this.user = response.data
          localStorage.setItem('userData', JSON.stringify(this.user))
          if (localStorage.getItem('userData')) {
            this.userData = localStorage.getItem('userData')
            this.dataUserLC = JSON.parse(this.userData)

            this._clientService.getClientCar(this.dataUserLC._id, this.token).subscribe({
              next : response => {
                this.clientCar = response.data;
                this.calculateSubtotal()

              }
            })
          }else{
            this.userData = undefined
          }

        },
        error : err => {{
          this.user = undefined
        }}
      })
    }


  }

  ngOnInit(): void {
    this.socket.on('newCar', (data) =>{
      console.log(data);
      this._clientService.getClientCar(this.dataUserLC._id, this.token).subscribe({
        next : response => {
          this.clientCar = response.data;
          this.calculateSubtotal()

        }
      })
    })

    this.socket.on('addNewCar', (data) =>{
      console.log(data);
      this._clientService.getClientCar(this.dataUserLC._id, this.token).subscribe({
        next : response => {
          this.clientCar = response.data;
          this.calculateSubtotal()

        }
      })
    })
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/'])
  }

  openModalCart(){
    if (!this.openCart) {
      this.openCart = true
      $('#cart').addClass('show')
    }else{
      this.openCart = false
      $('#cart').removeClass('show')
    }
  }

  calculateSubtotal(){
    this.subtotal = 0;
    this.clientCar.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.product.price)
    })
  }

  removeProduct(id){
    this._clientService.deleteClientCar(id, this.token).subscribe({
      next : response => {
        this.socket.emit('removeProductCar', {data : response.data})

      }
    })
  }
}
