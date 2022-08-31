import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ClientsService } from 'src/app/services/clients.service';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  public clients : Array<any> = [];
  public filterLastName = '';
  public filterEmail = '';
  public page = 1;
  public pageSize = 5;
  public token;
  public loading = true

  constructor(
    private _clienService : ClientsService,
    private _apiService : ApiService
    ) {
      this.token = this._apiService.getToken();

    }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._clienService.getClients(null, null, this.token).subscribe(
      {
        next: response => {
          this.clients = response.data
          this.loading = false

        },
        error: err => {
          if(err.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#CD0303',
              class: 'text-danger',
              position: 'topCenter',
              message: 'Error al cargar los clientes',
              color: 'red', // blue, red, green, yellow,
              overlayClose: true,
              animateInside: true,
            });
          }
        }
      }
    );
  }

  filter(type){

    if (type == 'lastName') {
      if (this.filterLastName) {
        this.loading = true
        this._clienService.getClients(type, this.filterLastName, this.token).subscribe(
          {
            next: response => {
              this.clients = response.data
              this.loading = false
            },
            error: err => {
              if(err.data == undefined){
                iziToast.show({
                  title: 'ERROR',
                  titleColor: '#CD0303',
                  class: 'text-danger',
                  position: 'topCenter',
                  message: 'Error al cargar los clientes',
                  color: 'red', // blue, red, green, yellow,
                  overlayClose: true,
                  animateInside: true,
                });
              }
            }
          });
      }else {
        this.initData();
      }
    }else if(type == 'email'){
      if (this.filterEmail) {
        this.loading = true
        this._clienService.getClients(type, this.filterEmail, this.token).subscribe(
          {
            next: response => {
              this.clients = response.data
              this.loading = false
            },
            error: err => {
              if(err.data == undefined){
                iziToast.show({
                  title: 'ERROR',
                  titleColor: '#CD0303',
                  class: 'text-danger',
                  position: 'topCenter',
                  message: 'Error al cargar los clientes',
                  color: 'red', // blue, red, green, yellow,
                  overlayClose: true,
                  animateInside: true,
                });
              }
            }
          }
        );
      }else{
        this.initData();
      }
    }
  }

  deleteClient(id){
    this._clienService.deleteClient(id, this.token).subscribe({
      next: response => {
        iziToast.success({
          title: 'OKAY',
          position: 'topCenter',
          message: 'Cliente eliminado correctamente',
          overlayClose: true,
          animateInside: true,
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.initData();
      },
      error: err => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#CD0303',
          class: 'text-danger',
          position: 'topCenter',
          message: 'Error al intentar borrar el cliente',
          color: 'red', // blue, red, green, yellow,
          overlayClose: true,
          animateInside: true,
        });
      }
    })
  }

}
