import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

declare const iziToast
declare const Jquery:any;
declare const $:any;

@Component({
  selector: 'app-index-contact',
  templateUrl: './index-contact.component.html',
  styleUrls: ['./index-contact.component.css']
})
export class IndexContactComponent implements OnInit {

  public loading = true
  public loadingBtn = false
  public page = 1;
  public pageSize = 5;
  public messages : Array<any> = []
  public filter = '';
  public token;

  constructor(private _adminService : ApiService) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
  this.initData();
  }

  initData(){
    this._adminService.getMessage(this.token).subscribe({
      next : response =>{
        this.messages = response.data
        this.loading = false

      },
      error : err => {
        console.log(err);

      }
    })
  }

  cerrar(id){
    this.loadingBtn = true
    this._adminService.changeStatusMessage(id, {data: undefined}, this.token).subscribe({
      next: response => {
        iziToast.success({
          title: 'OKAY',
          position: 'topCenter',
          message: 'Mensaje cerrado',
          overlayClose: true,
          animateInside: true,
        });

        $('#statusModal-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.initData();
        this.loadingBtn = false
      },
      error: err => {
        iziToast.error({
          title: 'ERROR',
          position: 'topCenter',
          message: 'Error al intentar cerrar el mensaje',
          overlayClose: true,
          animateInside: true,
        });
      }
    })
  }

}
