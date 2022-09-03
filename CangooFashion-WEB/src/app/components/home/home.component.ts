import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GlobalConexion } from 'src/app/services/global';
import { GuestService } from 'src/app/services/guest.service';

declare const tns

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public newProduct : Array<any> = []
  public productMostSalled : Array<any> = []
  public categories : Array<any> = []
  public url

  constructor(private _clientService : ClientService, private _guestService : GuestService) {
    this.url = GlobalConexion.url
    /* Obteniendo las categorias */
    this._clientService.getConfigPublic().subscribe({
      next : response => {
        response.data.categories.forEach(element => {
          if (element.businessName == 'Playera') {
            this.categories.push({
              title : element.businessName,
              portada : 'url'
            })
          }else if (element.businessName == 'Pantalones') {
            this.categories.push({
              title : element.businessName,
              portada : 'url'
            })
          }else if (element.businessName == 'Sueter') {
            this.categories.push({
              title : element.businessName,
              portada : 'url'
            })
          }else if (element.businessName == 'Sueter M') {
            this.categories.push({
              title : element.businessName,
              portada : 'url'
            })
          }else if (element.businessName == 'Sueter F') {
            this.categories.push({
              title : element.businessName,
              portada : 'url'
            })
          }
        })

      }
    })
   }

  ngOnInit(): void {

    /* Productos agregados recientemente */
    this._guestService.getProductNewsShop().subscribe({
      next : response =>{

        this.newProduct = response.data
      },
      error : err => {
        console.log(err)
      }
    })
    /*  Productos mas vendidos */
    this._guestService.getProductMostSelledShop().subscribe({
      next : response =>{
        this.productMostSalled = response.data
      },
      error : err => {
        console.log(err)
      }
    })

    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        mode: 'gallery',
        navContainer: '#pager',
        responsive: {
          0: { controls: false },
          991: { controls: true }
        }
      });

      tns({
        container: '.cs-carousel-inner-two',
        controls: false,
        responsive: {
          0: {
            gutter: 20
          },
          400: {
            items: 2,
            gutter: 20
          },
          520: {
            gutter: 30
          },
          768: {
            items: 3,
            gutter: 30
          }
        }

      });

      tns({
        container: '.cs-carousel-inner-three',
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          420: {
            items: 2,
            gutter: 20
          },
          600: {
            items: 3,
            gutter: 20
          },
          700: {
            items: 3,
            gutter: 30
          },
          900: {
            items: 4,
            gutter: 30
          },
          1200: {
            items: 5,
            gutter: 30
          },
          1400: {
            items: 6,
            gutter: 30
          }
        }


      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer:'#custom-controls-trending',
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

      tns({
        container: '.cs-carousel-inner-five',
        controls: false,
        gutter: 30,
        responsive: {
          0: { items: 1 },
          380: { items: 2 },
          550: { items: 3 },
          750: { items: 4 },
          1000: { items: 5 },
          1250: { items: 6 }
        }

      });

      tns({
        container: '.cs-carousel-inner-six',
        controls: false,
        gutter: 15,
        responsive: {
          0: { items: 2 },
          500: { items: 3 },
          1200: { items: 3 }
        }

      });

    },500);
  }

}
