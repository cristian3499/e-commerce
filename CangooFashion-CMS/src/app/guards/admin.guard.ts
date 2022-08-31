import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _apiServices :  ApiService,
    private _router : Router
    ) {

  }



  canActivate() :  any{
    if (!this._apiServices.isAuthenticated(['Admin'])) {
      this._router.navigate(['/login'])
      return false
    }
    return true
  }



}
