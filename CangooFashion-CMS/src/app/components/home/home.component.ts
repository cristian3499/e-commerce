import {Component, OnInit} from '@angular/core'
import { ApiService } from 'src/app/services/api.service';
import Chart from 'chart.js/auto'

@Component({
  selector : 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public token
  public gananciaTotal = 0
  public totalMes = 0
  public countSales = 0
  public totalMesAnterior = 0

  constructor(private _adminService : ApiService){
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._adminService.monthlyKpi(this.token).subscribe({
      next : response => {
        this.gananciaTotal = response.gananciaTotal
        this.totalMes = response.totalMes
        this.countSales = response.countSales
        this.totalMesAnterior = response.totalMesAnterior
        var canvas = <HTMLCanvasElement> document.getElementById('myChart')!
        var ctx = canvas.getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Meses',
                    data: [response.enero,
                      response.febrero,
                      response.marzo,
                      response.abril,
                      response.mayo,
                      response.junio,
                      response.julio,
                      response.agosto,
                      response.septiembre,
                      response.octubre,
                      response.noviembre,
                      response.diciembre,
                    ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

      },
      error : err => {
        console.log(err);

      }
    })
  }
}
