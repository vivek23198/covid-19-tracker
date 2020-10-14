import { Component, OnInit } from '@angular/core';
import { DataServiceService} from '../../services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  datatable = [];
  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",
    height: 600,
    options: {

      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }



  constructor(private dataService: DataServiceService) { }

  initChart(caseType : string){


    this.datatable = [];
    // this.datatable.push([
    //   "Country",
    //   "Cases"
    // ])

    this.globalData.forEach(cs => {

      let value : number;

      if(caseType == 'c'){
        if(cs.confirmed > 200000){
          console.log("confirm")
          value = cs.confirmed
          console.log(value);
        }
      }

      if(caseType == 'd'){
        if(cs.deaths > 1000){
          console.log("Deaths");
          value = cs.deaths
          console.log(value);
        }
      }

      if(caseType == 'r'){
        if(cs.recovered > 20000){
          value = cs.recovered
        }

      }

      if(caseType == 'a'){
        if(cs.active > 2000){
          value = cs.active
        }

      }

      this.datatable.push([
        cs.country, value
      ])

    })
    console.log(this.datatable);



    };





  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result)=>{
            console.log(result);
            this.globalData = result;
            result.forEach( cs => {
              if(!Number.isNaN(cs.confirmed)){
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeaths += cs.deaths;
                this.totalRecovered += cs.active;
              }

            })

            this.initChart('c');
          }
        }
      )
  }

  updateChart(input: HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value);
  }

}
