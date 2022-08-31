import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'
declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public userData : any = {};
  public token : any = '';

  constructor(
    private _adminServices : ApiService,
    private _router: Router
    ) {
      this.token = this._adminServices.getToken();
    }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/'])
    }else{
      //Se mantiene
    }
  }

  login(loginForm){

    if (loginForm.valid) {

      let data = {
        email : this.user.email,
        password : this.user.password
      }
      this._adminServices.loginAdmin(data).subscribe(
        {
          next: response => {
            this.userData = response.data
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id)
            this._router.navigate(['/'])
          },
          error: err => {
            if(err.data == undefined){
              iziToast.show({
                title: 'ERROR',
                titleColor: '#CD0303',
                class: 'text-danger',
                position: 'topCenter',
                message: err.error.message,
                color: 'red', // blue, red, green, yellow,
                overlayClose: true,
                animateInside: true,
              });
            }
          }
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#CD0303',
        class: 'text-danger',
        position: 'topCenter',
        message: 'Asegurate que los campos esten completos',
        color: 'red', // blue, red, green, yellow,
        overlayClose: true,
        animateInside: true,
      });
    }

  }

}
