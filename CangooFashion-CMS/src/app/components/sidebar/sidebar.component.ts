import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public userName

  constructor(private _router : Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/'])
  }

}
