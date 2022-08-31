import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClientsService } from 'src/app/services/clients.service';

declare const iziToast;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public client : any = {
    gender : ''
  };
  public token
  public loadingBtn = false

  constructor(
    private _clientService : ClientsService,
    private _apiServices : ApiService,
    private _router :Router
  ) {

    this.token = this._apiServices.getToken();
  }

  ngOnInit(): void {
  }

  clientRegister(clientForm){

    if(clientForm.valid){
      this.loadingBtn = true
      this._clientService.registerClientCMS(this.client, this.token).subscribe({
        next: response => {
          iziToast.success({
            title: 'OKAY!',
            position: 'topCenter',
            message: 'Registro creado correctamente',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false;
          this._router.navigate(['/panel/clients'])
        },
        error: err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Error al crear el cliente',
            overlayClose: true,
            animateInside: true,
          });
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Verifica que los datos del formulario esten correctos',
            overlayClose: true,
            animateInside: true,
          });
        }
      })

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#CD0303',
        class: 'text-danger',
        position: 'topCenter',
        message: 'Error al crear el clienteeeee',
        color: 'red', // blue, red, green, yellow,
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
