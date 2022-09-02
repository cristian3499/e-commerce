import { Injectable } from '@angular/core';
import { GlobalConexion } from "./global";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url;
  }

  login(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, {headers :  headers})
  }

  getClientByIdShop(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getClientByIdShop/' + id, {headers :  headers})
  }

  updateClientShop(id, data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'updateClientShop/' + id, data, {headers :  headers})
  }

  public isAuthenticated() : boolean{
    const token = localStorage.getItem('token')

    if (!token) {
      return false
    }

    try {
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

    if (helper.isTokenExpired(token)) {
      localStorage.clear();
      return false;
    }

    if (!decodedToken) {
      localStorage.clear();
      return false
    }

    } catch (error) {
      localStorage.clear();
      return false
    }

    return true
  }

  getConfigPublic():Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this._http.get(this.url + 'getConfigPublic', {headers :  headers})
  }

  getProductShop(filter):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this._http.get(this.url + 'getProductShop/' + filter, {headers :  headers})
  }

  addCart(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'addCart', data, {headers :  headers})
  }

  getClientCar(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getClientCar/' + id, {headers :  headers})
  }

  deleteClientCar(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteClientCar/' + id, {headers :  headers})
  }

  registerAddress(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'registerAddress', data, {headers :  headers})
  }

  deleteAddress(id, client, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteAddress/' + id + '/' + client, {headers :  headers})
  }

  getAddress(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getAddress/'+ id, {headers :  headers})
  }

  changeAddressPrincipal(id, client, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'changeAddressPrincipal/'+ id + '/' + client, {data : true}, {headers :  headers})
  }

  getAddressPrincipal(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getAddressPrincipal/'+ id, {headers :  headers})
  }

  RegisterSale(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'RegisterSale', data, {headers :  headers})
  }

  getOrderClient(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getOrderClient/' + id, {headers :  headers})
  }

  getOrderDetailsClient(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getOrderDetailsClient/' + id, {headers :  headers})
  }

  reviewClient(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'reviewClient', data, {headers :  headers})
  }

  /* getTokenStripe(data):Observable<any>{
    let headers = new HttpHeaders();
    return this._http.post(this.url + 'RegisterSale', data, {headers :  headers})
  } */

}
