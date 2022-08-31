import { Injectable } from '@angular/core';
import { GlobalConexion } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url;
  }

  registerCoupon(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'registerCoupon', data, {headers :  headers})
  }

  getCoupons(filter, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getCoupons/' + filter, {headers :  headers})
  }

  getCouponById(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getCouponById/' + id, {headers :  headers})
  }

  updateCoupon(id, data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'updateCoupon/' + id, data, {headers :  headers})
  }

  deleteCoupon(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteCoupon/' + id, {headers :  headers})
  }
}
