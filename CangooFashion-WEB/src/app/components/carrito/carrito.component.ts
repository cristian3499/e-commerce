import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';
import { io } from 'socket.io-client'
import { Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
import { loadStripe, Stripe } from "@stripe/stripe-js";

declare const Cleave
declare var paypal;
declare const StickySidebar
declare var iziToast;


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @ViewChild('paypalButton', { static: true })
  paypalElement!: ElementRef;

  public id
  public token
  public url;
  public clientCar : Array<any> = []
  public subtotal = 0
  public totalToPay : any = 0
  public socket = io('http://localhost:4201')
  public addressPrincipal : any = {}
  public envios : Array<any> = [];
  public precioEnvio = "0";
  public sale : any = {};
  public dSale : Array<any> = [];
  public cardData : any = {}
  public btnLoad = false
  public carLoad = true

  public stripe : Stripe


  constructor(private _router: Router, private _clientService : ClientService, private _guestService : GuestService) {
    this.url = GlobalConexion.url
    this.id = localStorage.getItem('_id')
    this.sale.client = this.id
    this.token = localStorage.getItem('token')


    this._guestService.getEnvios().subscribe({
      next : response => {
        this.envios = response
      }
    })
  }

  async ngOnInit() {
    this.initData()
    this.stripe = await loadStripe('pk_test_51LV19EDvHTkSTTUCPyjGDXP9htnOEQqMcergmLCi85PCRi6GbKRSxw6h1dml8SoHTPMcZYg2qegYtM0F4eUIe58D00DJHrLnzo')
    //console.log(this.stripe);

    setTimeout(()=>{
      new Cleave('#cc-number',{
        creditCard : true,
        onCreditCardTypeChanged : function(type){

        }
      });

      new Cleave('#cc-exp-date', {
        date : true,
        datePattern:['m', 'y']
      });

      var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20})
    })

    this.getAddressPrincipal()

    paypal.Buttons({
    style: {
        layout: 'horizontal'
    },
    createOrder: (data,actions)=>{

        return actions.order.create({
          purchase_units : [{
            description : 'Pago por medio la Tienda Online',
            amount : {
              currency_code : 'MXN',
              value: this.subtotal
            },
          }]
        });

    },
    onApprove : async (data,actions)=>{
      const order = await actions.order.capture();
      //console.log(order);

      this.sale.transaccion = order.purchase_units[0].payments.captures[0].id
      //console.log(this.dSale);

      this.sale.details = this.dSale

      this._clientService.RegisterSale( this.sale, this.token).subscribe({
        next : response => {
          console.log(response)
          iziToast.success({
            title: 'Okay',
            position: 'topCenter',
            message: 'Compra realizada con exito',
            overlayClose: true,
            animateInside: true,
          });
          this._router.navigate(['/'])
        }
      })

    },
    onError : err =>{

    },
    onCancel: function (data, actions) {

    }
  }).render(this.paypalElement.nativeElement);

    const elements = this.stripe.elements();
    const card = elements.create('card',{
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#000000',
          fontWeight: '600',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          lineHeight: '1.429',

          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#424551',
          },
        },
        invalid: {
          iconColor: '#ab0413',
          color: '#ab0413',
        },
      },
    });
    card.mount('#card')

    card.on('change', (event) =>{
      const displayError = document.getElementById('erroresCard')
      event.error ? displayError.textContent = event.error.message : displayError.textContent = '';
    });

    const button = document.getElementById('btnPay');

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const ownerInfo = {
        owner : { name : 'Prueba' },
        amount : this.subtotal * 100,
        currency : 'mxn'
      };

      try {
        const res = await this.stripe.createSource(card, ownerInfo)
        console.log(res);
        this.sale.details = this.dSale

        this._clientService.RegisterSale( this.sale, this.token).subscribe({
          next : response => {
            console.log(response)
            iziToast.success({
              title: 'Okay',
              position: 'topCenter',
              message: 'Compra realizada con exito',
              overlayClose: true,
              animateInside: true,
            });
            this._router.navigate(['/'])
          }
        })
      } catch (error) {
        console.log(error.message);

      }
    })


  }

  initData(){
    this._clientService.getClientCar(this.id, this.token).subscribe({
      next : response => {
        this.clientCar = response.data;

        this.clientCar.forEach(element => {
          this.dSale.push({
            product : element.product._id,
            subtotal : element.product.price,
            varieties : element.variety,
            quantity : element.quantity,
            client : localStorage.getItem('_id')
          });
        });
        this.carLoad = false
        this.calculateSubtotal()
        this.totalPay('Envio Gratis')

      }
    })
  }

  calculateSubtotal(){
    this.subtotal = 0;
    this.clientCar.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.product.price)
    })
    this.totalToPay =  this.subtotal
  }

  removeProduct(id){
    this._clientService.deleteClientCar(id, this.token).subscribe({
      next : response => {
        this.socket.emit('removeProductCar', {data : response.data})
        this.initData()

      }
    })
  }

  getAddressPrincipal(){
    this._clientService.getAddressPrincipal(localStorage.getItem('_id'), this.token).subscribe({
      next : response => {
        if (response.data == undefined) {
          this.addressPrincipal = undefined
        }else {
          this.addressPrincipal = response.data
          this.sale.direccion = this.addressPrincipal._id
        }

      }
    })
  }

  totalPay(envioTitulo){
    this.totalToPay =  parseInt(this.subtotal.toString()) + parseInt(this.precioEnvio);
    this.sale.subtotal =  this.totalToPay;
    this.sale.envioPrecio = parseInt(this.precioEnvio)
    this.sale.envioTitulo = envioTitulo

    //console.log(this.sale);

  }
}
