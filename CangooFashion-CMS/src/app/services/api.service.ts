import { Injectable } from '@angular/core';
import { GlobalConexion } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url;
  }

  loginAdmin(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginAdmin', data, {headers :  headers})
  }

  getToken(){
    return localStorage.getItem('token')
  }

  public isAuthenticated(allowRoles :  string[]) : boolean{
    const token = localStorage.getItem('token')

    if (!token) {
      return false
    }

    try {
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

    /*
    if (helper.isTokenExpired(token)) {
      localStorage.clear();
      return false;
    }
    */

    if (!decodedToken) {
      localStorage.removeItem('token')
      return false
    }

    } catch (error) {
      localStorage.removeItem('token')
      return false
    }

    return allowRoles.includes(decodedToken['rol'])
  }

  getConfig(token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getConfig', {headers :  headers})
  }

  updateConfig(id, data, token):Observable<any>{
    if (data.logo) {
      let headers = new HttpHeaders({'authorization' :  token});

      const formData =  new FormData();
      formData.append('businessName', data.businessName)
      formData.append('serie', data.serie)
      formData.append('correlative', data.correlative)
      formData.append('categories', JSON.stringify(data.categories))
      formData.append('logo', data.logo)
      return this._http.put(this.url + 'updateConfig/' + id, formData, {headers :  headers})

  }else{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'updateConfig/' + id, data, {headers :  headers})
  }

  }

  getConfigPublic():Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this._http.get(this.url + 'getConfigPublic', {headers :  headers})
  }

  getMessage(token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getMessage', {headers :  headers})
  }

  changeStatusMessage(id, data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'changeStatusMessage/' + id, data, {headers :  headers})
  }

  salesHistory(desde, hasta, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'salesHistory/' + desde + '/' + hasta, {headers :  headers})
  }

  getOrderDetailsClient(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getOrderDetailsClient/' + id, {headers :  headers})
  }

  /* KPI */
  monthlyKpi(token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'monthlyKpi', {headers :  headers})
  }
}
