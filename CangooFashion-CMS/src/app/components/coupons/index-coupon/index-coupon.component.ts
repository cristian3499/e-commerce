import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';

declare const iziToast
declare const Jquery:any;
declare const $:any;

@Component({
  selector: 'app-index-coupon',
  templateUrl: './index-coupon.component.html',
  styleUrls: ['./index-coupon.component.css']
})
export class IndexCouponComponent implements OnInit {

  public loading = true
  public loadingBtn = false
  public page = 1;
  public pageSize = 5;
  public coupons : Array<any> = []
  public filter = '';
  public token;

  constructor(private _couponService :  CouponService) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this._couponService.getCoupons(this.filter, this.token).subscribe({
      next : response => {
        this.coupons = response.data
        this.loading = false

      },
      error: err => {
        console.log(err);

      }
    })
  }

  filterCupon(){
    this._couponService.getCoupons(this.filter, this.token).subscribe({
      next : response => {
        this.coupons = response.data
        this.loading = false

      }
    })
  }

  deleteCoupon(id){
    this._couponService.deleteCoupon(id, this.token).subscribe({
      next: response => {
        iziToast.success({
          title: 'OKAY',
          position: 'topCenter',
          message: 'Cupon eliminado correctamente',
          overlayClose: true,
          animateInside: true,
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this._couponService.getCoupons(this.filter, this.token).subscribe({
          next : response => {
            this.coupons = response.data
            this.loading = false

          },
          error: err => {
            console.log(err);

          }
        })
      },
      error: err => {
        iziToast.error({
          title: 'ERROR',
          position: 'topCenter',
          message: 'Error al intentar borrar el cupon',
          overlayClose: true,
          animateInside: true,
        });
      }
    })
  }

}
