import { Injectable } from '@angular/core';
import { GlobalConexion } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url;
  }

  registerProduct(data, file, token):Observable<any>{
    let headers = new HttpHeaders({'authorization' :  token});
    const formData =  new FormData();
    formData.append('title', data.title)
    formData.append('stock', data.stock)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('context', data.context)
    formData.append('category', data.category)
    formData.append('frontPage', file)
    return this._http.post(this.url + 'registerProduct', formData, {headers :  headers})
  }

  getProduct(filter, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getProduct/' + filter, {headers :  headers})
  }

  getProductById(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getProductById/' + id, {headers :  headers})
  }

  updateProduct(data, id, token):Observable<any>{
    if (data.frontPage) {
        let headers = new HttpHeaders({'authorization' :  token});

        const formData =  new FormData();
        formData.append('title', data.title)
        formData.append('stock', data.stock)
        formData.append('price', data.price)
        formData.append('description', data.description)
        formData.append('context', data.context)
        formData.append('category', data.category)
        formData.append('frontPage', data.frontPage)
        return this._http.put(this.url + 'updateProduct/' + id, formData, {headers :  headers})

    }else{
      let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
      return this._http.put(this.url + 'updateProduct/' + id, data, {headers :  headers})
    }
  }

  deleteProduct(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteProduct/' + id, {headers :  headers})
  }

  inventoryProduct(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'inventoryProduct/' + id, {headers :  headers})
  }

  deleteInventory(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteInventory/' + id, {headers :  headers})
  }

  registerInventary(data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.post(this.url + 'registerInventary', data, {headers :  headers})
  }

  updateVarieties(data, id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'updateVarieties/' + id, data, {headers :  headers})
  }

  addGalleryImage(id, data, token):Observable<any>{
    let headers = new HttpHeaders({'authorization' :  token});
    const formData =  new FormData();
    formData.append('_id', data._id)
    formData.append('image', data.image)
    return this._http.put(this.url + 'addGalleryImage/' + id, formData, {headers :  headers})
  }

  deleteGalleryImage(id, data, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.put(this.url + 'deleteGalleryImage/' + id, data, {headers :  headers})
  }
}
