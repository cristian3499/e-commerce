import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';
import { GuestService } from 'src/app/services/guest.service';
import { io } from 'socket.io-client'

declare const tns
declare const lightGallery
declare var iziToast;

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  public slug
  public product : any = {};
  public url
  public token
  public productRecommended : Array<any> = []

  public addCar : any = {
    variety : '',
    quantity : 1
  }

  public btnCard = false
  public socket = io('http://localhost:4201')

  constructor(private _guestService : GuestService, private _route : ActivatedRoute, private _clientService : ClientService) {
    this.token = localStorage.getItem('token')
    this.url = GlobalConexion.url;
    this._route.params.subscribe(
      params => {
        this.slug = params['slug'];
        this._guestService.getDetailProductShop(this.slug).subscribe({
          next : res => {
            this.product = res.data
            this._guestService.getProductRecommendedShop(this.product.category).subscribe({
              next : res => {
                this.productRecommended = res.data

              }
            })
          },
          error : err => {
            console.log(err);

          }
        })

      }
    )
  }

  ngOnInit(): void {
    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }
      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });
    }, 500)
  }

  addProduct(){
    if (this.addCar.variety) {
      if (this.addCar.quantity <= this.product.stock) {
        const data = {
          product : this.product._id,
          client : localStorage.getItem('_id'),
          quantity : this.addCar.quantity,
          variety : this.addCar.variety
        }
        this.btnCard = true
        this._clientService.addCart(data, this.token).subscribe({
          next : response => {
            if (response.data == undefined) {
              iziToast.error({
                title: 'ERROR',
                position: 'topRight',
                message: 'El producto ya existe en el carrito',
                overlayClose: true,
                animateInside: true,
              });
              this.btnCard = false
            }else{
              console.log(response);
              iziToast.success({
                title: 'Okay',
                position: 'topRight',
                message: 'Producto agregado',
                overlayClose: true,
                animateInside: true,
              });
              this.socket.emit('addProductCar',{data : true})
              this.btnCard = false
            }
          }
        })
      }else{
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Lo sentimos, la maxima cantidad de producto es de: ' + this.product.stock,
          overlayClose: true,
          animateInside: true,
        });
      }
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Necesitas escoger una talla',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
