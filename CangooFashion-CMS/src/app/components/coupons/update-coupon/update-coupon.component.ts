import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';

declare const iziToast;


@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {

  public coupons : any = {
    type: ''
  };
  public loadingBtn = false
  public loading = true
  public token;
  public id

  constructor(private _route :  ActivatedRoute, private _couponService : CouponService, private _router :Router) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id']
        this._couponService.getCouponById(this.id, this.token).subscribe({
          next: response => {
            if (response.data == undefined) {
              this.coupons = undefined
              this.loading = false;
            }else {
              this.coupons =  response.data
              this.loading = false;
            }
          },
          error: err => {
            iziToast.error({
              title: 'ERROR',
              position: 'topCenter',
              message: 'Error al encontrar el cupon',
              overlayClose: true,
              animateInside: true,
            });
          }
        })

      }
    )
  }

  updateCoupon(couponForm){
    if (couponForm.valid) {
      this.loadingBtn = true
      this._couponService.updateCoupon(this.id, this.coupons, this.token).subscribe({
        next : response => {
          iziToast.success({
            title: 'OKAY!',
            position: 'topCenter',
            message: 'Cupon editado correctamente',
            overlayClose: true,
            animateInside: true,
          });
          this.loadingBtn = false
          this._router.navigate(['/panel/coupons'])
        },
        error : err => {
          iziToast.error({
            title: 'ERROR',
            position: 'topCenter',
            message: 'Hubo un error al editar el cupon',
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
