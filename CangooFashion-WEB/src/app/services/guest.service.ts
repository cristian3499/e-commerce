import { Injectable } from '@angular/core';
import { GlobalConexion } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url;
  }

  getDetailProductShop(slug):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this._http.get(this.url + 'getDetailProductShop/' + slug, {headers :  headers})
  }

  getProductRecommendedShop(category):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this._http.get(this.url + 'getProductRecommendedShop/' + category, {headers :  headers})
  }

  getProductNewsShop():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'getProductNewsShop', {headers :  headers})
  }

  getProductMostSelledShop():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'getProductMostSelledShop', {headers :  headers})
  }

  sendMessageContact(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'sendMessageContact', data, {headers :  headers})
  }

  getRegiones():Observable<any>{
    return this._http.get('./assets/regiones.json')
  }
  getDistritos():Observable<any>{
    return this._http.get('./assets/distritos.json')
  }
  getProvincias():Observable<any>{
    return this._http.get('./assets/provincias.json')
  }

  getEnvios():Observable<any>{
    return this._http.get('./assets/envios.json')
  }

}
