import { Injectable } from '@angular/core';
import { GlobalConexion } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url;
  }

  getClients(type, filter, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getClients/' + type + '/' + filter, {headers :  headers})
  }

  registerClientCMS(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'registerClientCMS', data, {headers :  headers})
  }

  getClientById(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getClientById/' + id, {headers :  headers})
  }

  updateClient(id, data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'updateClient/' + id, data, {headers :  headers})
  }

  deleteClient(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteClient/' + id, {headers :  headers})
  }

  sendEmail(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'sendEmail/'+ id, {headers :  headers})
  }
}
