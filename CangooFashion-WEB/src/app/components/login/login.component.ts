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

  constructor(private _router: Router, private _clientService : ClientService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if (this.token) {
      this._router.navigate(['/'])
    }
  }

  login(loginForm){
    if (loginForm.valid) {
      console.log(this.user);
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
                position: 'topRight',
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
        position: 'topRight',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }


}
