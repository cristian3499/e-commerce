import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClientsService } from 'src/app/services/clients.service';

declare const iziToast;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public client : any = {};
  public id;
  public token;
  public loadingBtn = false
  public loading = true;

  constructor(
    private _route :  ActivatedRoute,
    private _clientService : ClientsService,
    private _apiService : ApiService,
    private _router : Router
  ) {
    this.token = this._apiService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id']
        this._clientService.getClientById(this.id, this.token).subscribe({
          next: response => {
            if (response.data == undefined) {
              this.client = undefined
              this.loading = false;
            }else {
              this.client =  response.data
              this.loading = false;
            }
          },
          error: err => {
            iziToast.error({
              title: 'ERROR',
              position: 'topCenter',
              message: 'Error al encontrar al cliente',
              overlayClose: true,
              animateInside: true,
            });
          }
        })

      }
    )
  }

  update(updateForm){
    if (updateForm.valid) {
      this.loadingBtn = true
      this._clientService.updateClient(this.id, this.client, this.token).subscribe({
        next: response => {
          iziToast.success({
            title: 'OKAY',
            position: 'topCenter',
            message: 'Cliente actualizado',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false
          this._router.navigate(['/panel/clients'])
        },
        error: err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Error al editar el cliente',
            overlayClose: true,
            animateInside: true,
          });
        }
      })


    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Verifica los datos del formulario',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
