import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';

declare const iziToast;

@Component({
  selector: 'app-create-coupons',
  templateUrl: './create-coupons.component.html',
  styleUrls: ['./create-coupons.component.css']
})
export class CreateCouponsComponent implements OnInit {

  public coupons : any = {
    type: ''
  };
  public loadingBtn = false
  public token;

  constructor(private _couponService : CouponService, private _router :Router) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
  }

  createCoupon(couponForm){
    if (couponForm.valid) {
      this.loadingBtn = true
      this._couponService.registerCoupon(this.coupons, this.token).subscribe({
        next : response =>{
          iziToast.success({
            title: 'OKAY!',
            position: 'topCenter',
            message: 'Cupon creado correctamente',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false;
          this._router.navigate(['/panel/coupons'])

        },
        error: err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Error al crear el cupón',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false;
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

}
