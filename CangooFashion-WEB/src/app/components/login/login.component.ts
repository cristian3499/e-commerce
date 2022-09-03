import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any ={};
  public userData : any = {};
  public token;
  public client : any = {
    gender : ''
  };

  constructor(private _router: Router, private _clientService : ClientService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if (this.token) {
      this._router.navigate(['/'])
    }
  }

  login(loginForm){
    if (loginForm.valid) {
      let data = {
        email : this.user.email,
        password : this.user.password
      }
      this._clientService.login(data).subscribe(
        {
          next: response => {
            this.userData = response.data
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id)
            this._router.navigate(['/'])
          },
          error: err => {
            if(err.data == undefined){
              iziToast.error({
                title: 'ERROR',
                position: 'topCenter',
                message: err.error.message,
                overlayClose: true,
                animateInside: true,
              });
            }
          }
        }
      );

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  clientRegister(clientForm){

    if(clientForm.valid){
      this._clientService.registerClients(this.client).subscribe({
        next : response => {
          iziToast.success({
            title: 'Okay',
            position: 'topCenter',
            message: 'Registro realizado con exito!',
            overlayClose: true,
            animateInside: true,
          });
        },
        error : err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Ups! al parecer hubo un error con el registro, intenta de nuevo',
            overlayClose: true,
            animateInside: true,
          });
        }
      })

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }


}
