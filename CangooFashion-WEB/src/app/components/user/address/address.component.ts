import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GuestService } from 'src/app/services/guest.service';

declare const $:any;
declare var iziToast;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public token
  public id
  public regiones : Array<any> = []
  public provincias : Array<any> = []
  public distritos : Array<any> = []

  public direcciones : Array<any> = []

  public regionesArr : Array<any> = []
  public provinciasArr : Array<any> = []
  public distritosArr : Array<any> = []

  public address : any = {
    pais : '',
    region : '',
    provincia : '',
    distrito : '',
    principal : false
  }
  public loadData = true

  constructor(private _guestService : GuestService, private _clientService : ClientService) {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')

    this._guestService.getRegiones().subscribe({
      next : response => {
      this.regionesArr = response

      }
    })

    this._guestService.getProvincias().subscribe({
      next : response => {
      this.provinciasArr = response

      }
    })

    this._guestService.getDistritos().subscribe({
      next : response => {
      this.distritosArr = response

      }
    })
  }

  ngOnInit(): void {
    this.getAddress()
  }

  selectCountry(){
    if (this.address.pais == 'Perú') {
      $('#ac-region').prop('disabled', false)
      this._guestService.getRegiones().subscribe({
        next : response => {
          response.forEach(element => {
            this.regiones.push({
              id : element.id,
              name : element.name
            })
          })

        }
      })
    }else {
      $('#ac-region').prop('disabled', true)
      $('#ac-provincia').prop('disabled', true)
      this.regiones = []
      this.provincias = []

      this.address.region = ''
      this.address.provincia = ''
    }
  }

  selectRegion(){
    this.provincias = []
    $('#ac-provincia').prop('disabled', false)
    $('#ac-distrito').prop('disabled', true)
    this.address.provincia = ''
    this.address.distrito = ''
    this._guestService.getProvincias().subscribe({
      next : response => {
        response.forEach(element => {
          if (element.department_id == this.address.region) {
            this.provincias.push(
              element
            )
          }
        })
        console.log(this.provincias);

      }
    })
  }

  selectProvincia(){
    this.distritos = []
    $('#ac-distrito').prop('disabled', false)
    this.address.distrito = ''
    this._guestService.getDistritos().subscribe({
      next : response => {
        response.forEach(element => {
          if (element.province_id == this.address.provincia) {
            this.distritos.push(
              element
            )
          }
        })
      }
    })
  }

  registerAddress(registerForm){
    if (registerForm.valid) {
      this.regionesArr.forEach(element => {
        if (parseInt(element.id) == parseInt(this.address.region)) {
          this.address.region = element.name
        }
      })

      this.provinciasArr.forEach(element => {
        if (parseInt(element.id) == parseInt(this.address.provincia)) {
          this.address.provincia = element.name
        }
      })

      this.distritosArr.forEach(element => {
        if (parseInt(element.id) == parseInt(this.address.distrito)) {
          this.address.distrito = element.name
        }
      })

      const data = {
        destinatario : this.address.destinatario,
        dni : this.address.dni,
        zip : this.address.zip,
        direccion : this.address.direccion,
        telefono : this.address.telefono,
        pais : this.address.pais,
        region : this.address.region,
        provincia : this.address.provincia,
        distrito : this.address.distrito,
        principal : this.address.principal,
        client : localStorage.getItem('_id')
      }

      this._clientService.registerAddress(data, this.token).subscribe({
        next : response => {
          this.address  = {
            pais : '',
            region : '',
            provincia : '',
            distrito : '',
            principal : false
          }
          this.getAddress()

          /* $('#ac-region').prop('disabled', true)
          $('#ac-provincia').prop('disabled', true)
          $('#ac-distrito').prop('disabled', true) */

        }
      })
      iziToast.success({
        title: 'Okay',
        position: 'topRight',
        message: 'Direccion agregada correctamente',
        overlayClose: true,
        animateInside: true,
      });

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  getAddress(){
    this._clientService.getAddress(this.id, this.token).subscribe({
      next : response => {
        this.direcciones = response.data
        this.loadData = false
      }
    })
  }

  addressPrincipal(id){
    this._clientService.changeAddressPrincipal(id, localStorage.getItem('_id'), this.token).subscribe({
      next : response => {
        this.getAddress()
        iziToast.success({
          title: 'Okay',
          position: 'topRight',
          message: 'La direccion principal fue cambiada',
          overlayClose: true,
          animateInside: true,
        });
      }
    })
  }

  deleteAddress(id){
    this._clientService.deleteAddress(id, localStorage.getItem('_id'), this.token).subscribe({
      next : response => {
        iziToast.success({
          title: 'Okay',
          position: 'topRight',
          message: 'La direccion fue borrada',
          overlayClose: true,
          animateInside: true,
        });
      },
      error : err=> {
        console.log(err);

      }
    })
  }

}
