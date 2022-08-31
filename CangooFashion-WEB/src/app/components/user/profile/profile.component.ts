import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast;
declare const Jquery:any;
declare const $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user : any = {};
  public id;
  public token;

  constructor(private _clientService : ClientService) {
    this.id = localStorage.getItem('_id')
    this.token = localStorage.getItem('token')

    if (this.id) {
      this._clientService.getClientByIdShop(this.id, this.token).subscribe({
        next : response => {
          console.log(response);
          this.user = response.data

        }
      })
    }
  }

  ngOnInit(): void {
  }

  updateData(updateForm){
    if (updateForm.valid) {
      this.user.password = $('#ac-phone').val();
      this._clientService.updateClientShop(this.id, this.user, this.token).subscribe({
        next : response => {
          iziToast.success({
            title: 'Okay',
            position: 'topRight',
            message: 'Información editada',
            overlayClose: true,
            animateInside: true,
          });
        },
        error : err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: 'Ups! hubo un problema al actualizar la información',
            overlayClose: true,
            animateInside: true,
          });
        }
      })
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

}
