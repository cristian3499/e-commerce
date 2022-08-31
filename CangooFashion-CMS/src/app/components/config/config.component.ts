import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalConexion } from 'src/app/services/global';
import { v4 as uuidv4 } from 'uuid';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token;
  public config : any = {};
  public titleCategory = '';
  public iconCategory  = '';
  public file? : File = undefined;
  public imgSelected : any | ArrayBuffer = 'assets/img/01.jpg'
  public url;

  constructor(private _apiServices : ApiService) {
    this.token = localStorage.getItem('token')
    this.url = GlobalConexion.url;
    this._apiServices.getConfig(this.token).subscribe({
      next : response => {
        this.config = response.data
        this.imgSelected = this.url + 'getLogo/' + this.config.logo
      },
      error : err => {
        console.log(err);

      }
    })
   }

  ngOnInit(): void {
  }

  addCategorie(){
    if (this.iconCategory && this.titleCategory) {
      this.config.categories.push({
        businessName : this.titleCategory,
        icono : this.iconCategory,
        _id : uuidv4()
      })
      this.iconCategory = '';
      this.titleCategory = '';
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Ingrese los datos correspondientes para la categoria',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  updateConfig(configForm){
    if (configForm) {
      let data = {
        businessName : configForm.value.businessName,
        serie : configForm.value.serie,
        correlative : configForm.value.correlative,
        categories : this.config.categories,
        logo :  this.file
      }
      console.log(data);

      this._apiServices.updateConfig("62e4c28a7df78c227b111720", data, this.token).subscribe({
        next : response => {
          iziToast.success({
            title: 'OKAY!',
            position: 'topCenter',
            message: 'Configuracion Actualizada',
            overlayClose: true,
            animateInside: true,
          });
        }
      })

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Verifica que los datos del formulario esten correctos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

  fileChangeEvent(event : any) : void{
    var file;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0]

    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Error al cargar la imagen',
        overlayClose: true,
        animateInside: true,
      });
      $('#input-image-name').text('Seleccionar imagen')
      this.imgSelected = 'assets/img/01.jpg'
      this.file = undefined
    }

    if (file.size <= 4000000) {
      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'image/webp') {
        const reader = new FileReader();
        reader.onload = e => this.imgSelected = reader.result;
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload')
        reader.readAsDataURL(file)
        $('#input-image-name').text(file.name)
        this.file = file
      }else{
        iziToast.error({
          title: 'ERROR',
          position: 'topCenter',
          message: 'El tipo de imagen no coincide.',
          overlayClose: true,
          animateInside: true,
        });
        $('#input-image-name').text('Seleccionar imagen')
        this.imgSelected = 'assets/img/01.jpg'
        this.file = undefined
      }
    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Imagen mayor a 4MB',
        overlayClose: true,
        animateInside: true,
      });
      $('#input-image-name').text('Seleccionar imagen')
      this.imgSelected = 'assets/img/01.jpg'
      this.file = undefined
    }

  }

  ngDoCheck() : void {
    $('.cs-file-drop-preview').html("<img src=" + this.imgSelected + ">")
  }

  delateCategoty(idx){
    this.config.categories.splice(idx, 1)
  }

}
