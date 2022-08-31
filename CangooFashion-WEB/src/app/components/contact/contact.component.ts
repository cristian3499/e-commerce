import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

public contact : any = {}
public loadBtn = false

  constructor(private _guestService : GuestService) { }

  ngOnInit(): void {
  }

  register(registerForm){
    if(registerForm.valid){
      this.loadBtn = true
      this._guestService.sendMessageContact(this.contact).subscribe({
        next : res => {
          iziToast.success({
            title: 'Okay',
            position: 'topRight',
            message: "Mensaje enviado correctamente!",
            overlayClose: true,
            animateInside: true,
          });
          this.contact = {}
          this.loadBtn = false
        },
        error: err => {
          if(err.data == undefined){
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: "Ups! Hubo un problema al enviar tu mensaje",
              overlayClose: true,
              animateInside: true,
            });
          }
        }
      })
    }else{
      iziToast.success({
        title: 'Okay',
        position: 'topCenter',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }

  }

}
