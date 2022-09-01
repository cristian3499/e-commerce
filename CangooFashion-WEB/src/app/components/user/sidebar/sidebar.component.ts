import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public token;
  public user : any = undefined;
  public id;
  public userData : any = {};
  public dataUserLC;

  constructor(private _clientService : ClientService, private _router : Router) {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')

    this._clientService.getClientByIdShop(this.id, this.token).subscribe({
      next : response => {
        this.user = response.data
        localStorage.setItem('userData', JSON.stringify(this.user))
        if (localStorage.getItem('userData')) {
          this.userData = localStorage.getItem('userData')
          this.dataUserLC = JSON.parse(this.userData)
        }else{
          this.userData = undefined
        }

      },
      error : err => {{
        this.user = undefined
      }}
    })
  }

  ngOnInit(): void {
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/'])
  }

}
