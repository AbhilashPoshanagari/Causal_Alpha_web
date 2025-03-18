import { Component, OnInit, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
// import { api_url, websocket_url } from '../../constants/api-urls';
import { WebsocketService } from '../../services/websocket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Data Grid Component
import { AgGridAngular } from 'ag-grid-angular';
// Column Definition Type Interface
import { ColDef } from 'ag-grid-community';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";
import { StorageService } from '../../services/storage.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ml-time-series',
  imports: [NgApexchartsModule, CommonModule, 
    FormsModule, AgGridAngular, MatGridListModule,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './ml-time-series.component.html',
  styleUrl: './ml-time-series.component.css',
  standalone: true
})
export class MlTimeSeriesComponent implements OnInit, OnDestroy {
  private socket$: WebSocketSubject<any> | undefined;
  public series: ApexAxisChartSeries = [];
  public prediction: ApexAxisChartSeries = [];
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  // chartInstance!: Highcharts.Chart;
  // stock_data: Array<Array<number>> = [[]];
  chartOptions = { type: 'line', height: 400 };
  chartSeries: Array<any> = [];
  predictOptions: Array<any> = [];
  isMenuVisible = false;
  predictionTitle: ApexTitleSubtitle = { text: "Prediction with LSTM", align: "left" };
  mlflow_run_id: string = 'f1cefc2508a14252a7a54b965e6b3502';
  mlflow_reg_model: string = 'lstm_base_model';
  actual_price: Array<any> = [];
  predicted_price: Array<any> = []
  api_url: string = '';
  rowData: Array<Object> = [];
  colDefs: ColDef[] = [];
  responseData: any = {};
  pred_values: Array<any> = [];
  pred_col: Array<any> = [];
  parameters_col: Array<any> = [{ field: "Parameter"}, {field: "Value"}]
  metrics_col: Array<any> = [{ field: "Metric"}, {field: "Value"}]
  metrics: Array<any> = []
  parameters: Array<any> = []
  allRegistredModels: Array<any> = [];
  public loading: boolean = false; // Add a loading flag
  public pred_loading: boolean = false;
  constructor(private cdr: ChangeDetectorRef, 
    private ngZone: NgZone, private restapi: RestApiService, 
    private storageService: StorageService,
    private ws: WebsocketService){
      this.initChart();
      this.getServerURL();
  }
  ngOnInit(): void {
    this.responseData = this.restapi.getResponse();
    if(this.responseData && this.responseData.values.length){
      this.predictionChart(this.responseData)
    }
  }

  getServerURL(){
  const storedDomain = this.storageService.getDomain('fast_api');
      if (!storedDomain) {
      } else {
        this.api_url = storedDomain.domain_name;
      }
  }

  ngOnDestroy(): void {
    // this.restapi.setData(this.predicted_price, this.actual_price)
    this.restapi.setResponse(this.responseData)
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  private initChart(): void {
    this.chart = {
      type: "line",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    
    this.dataLabels = { enabled: false };
    this.markers = { size: 0, hover: { size: 6 } };
    this.title = { text: "Stock Price Prediction", align: "left" };
    this.fill = { type: "solid"};
    this.yaxis = {
      labels: {
        formatter: (val) => `$${val.toFixed(2)}`
      },
      title: { text: "Stock Price ($)" }
    };
    this.xaxis = { type: "datetime", title: { text: "Date" } };
    this.tooltip = {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `$${val.toFixed(2)}`
      }
    };
  }

  public fetchStockData(): void {
    this.loading = true; // Start loading before API call
    this.restapi.getService(this.api_url+"/datasets/trained_data").subscribe((res: any) => {
      if(res.status == 200){
        console.log(res.data)
        this.colDefs = this.tableSetup(res.data[0]);
        this.rowData = res.data;
        const chartData = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Close"]]);
        this.series = [
          {
            name: "Trained Price",
            data: chartData
          }
        ];
      }
      this.loading = false; // Stop loading after success
    }, (err) => {
      console.error("Error fetching stock data", err);
      this.loading = false; // Stop loading on error
    });
  }

tableSetup(values: any){
  let keys = Object.keys(values);
  let collectKeys: any = []
  for (let key = 0; key < keys.length; key++) {
      let obj = { field: keys[key] };
      collectKeys.push(obj)      
  }
  return collectKeys;
}

tableForMeticsSetup(column_name: string, values: any){
  let keys = Object.keys(values);
  let collectKeys: any = []
  for (let key = 0; key < keys.length; key++) {
      let obj:any = {}
        obj[column_name] = keys[key];
        obj["Value"] = values[obj[column_name]];
        if(Object.keys(obj).length){
          collectKeys.push(obj);
        }
  }
  return collectKeys;
}

public predictionChart(responseData: any={}): void {
  this.pred_loading = true;
if(Object.keys(responseData).length  && responseData.values.length){
  this.parameters = this.tableForMeticsSetup("Parameter", this.responseData.params);
  this.metrics = this.tableForMeticsSetup("Metric", this.responseData.metrics);
  this.prepareChartData(responseData.values);
}else {
    const url = this.mlflow_run_id? this.api_url+"/mlflow/predict/"+ this.mlflow_reg_model + "/"+this.mlflow_run_id: this.api_url+"/mlflow/predict"
    this.restapi.getService(url).subscribe((res:any) => {
      if(res.status == 200){
        this.responseData = res.data;
        this.parameters = this.tableForMeticsSetup("Parameter", this.responseData.params);
        this.metrics = this.tableForMeticsSetup("Metric", this.responseData.metrics);
        this.prepareChartData(this.responseData.values)
      }
      this.pred_loading = false;
    }, (err) => {   this.pred_loading = false;
    });
    }
  }

  prepareChartData(responseData: Array<any>){
    this.pred_col = this.tableSetup(responseData[0]);
        this.pred_values = responseData;
        this.actual_price = responseData.map((point:any) => [new Date(point["Date"]).getTime(), point["Actual_price"]]);
        this.predicted_price = responseData.map((point:any) => [new Date(point["Date"]).getTime(), point["Predicted_price"]]);
        this.prediction = [
          {
            name: "Actual Price",
            data: this.actual_price
          },
          {
            name: "Predicted Price",
            data: this.predicted_price
          }
        ];
  }

  get_run_id(model_name: string){
    this.pred_loading = true;
    const url = this.api_url + "/mlflow/getallversions/" + model_name;
    this.restapi.getService(url).subscribe((res: any) => {
      if(res.status == 200){
        this.allRegistredModels = res.data;
      }else {

      }
      this.pred_loading = false;
    }, (err) => {this.pred_loading = false;
  })
  }

  selectedRunId(event: string){

  }



  // loadLineChart() {
  //     this.restapi.getService(api_url+"datasets/trained_data").subscribe((res:any) => {
  //       if(res.status == 200){
  //         const chartData = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Close"]]);
  //         console.log("chart Data : ", chartData)
  //         setTimeout(() => {
  //           this.chartSeries = [{
  //             name: "Trained Data",
  //             data: chartData
  //           }]
  //           this.cdr.detectChanges();  // Force Angular to detect changes
  //         }, 200);
          
  //       }
        
  //     })
  //   }
  
  //   predictionChart(){
  //     this.restapi.getService(api_url+"mlflow/predict").subscribe((res:any) => {
  //       if(res.status == 200){
  //         const actual_price = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Actual_price"]]);
  //         const predicted_price = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Predicted_price"]]);
  //         setTimeout(() => {
  //         this.predictOptions = [{
  //           name: "Actual Price",
  //           data: actual_price,
  //           type: "line",
  //         },{
  //           name: "Predicted Price",
  //           data: predicted_price,
  //           type: "line",

  //         }
  //       ]
  //         this.cdr.detectChanges();  // Force Angular to detect changes
  //       }, 200);
  
  //       }
        
  //     })
  //   }

  start(){
    this.restapi.getService(this.api_url+'/kafka/start').subscribe((res: any) => {
      if(res.message == "WebSocket streaming started"){
        console.log(res);
      }
    })
  }

  stop(){
    this.restapi.getService(this.api_url+'/kafka/stop').subscribe((res: any) => {
      console.log(res);
      if(res.message == "WebSocket streaming started"){
        console.log(res);
      }
    })
  }

  // webSocket(){
  //   this.socket$ = new WebSocketSubject(websocket_url); // Update with your WebSocket URL
  //   this.socket$.subscribe(data => {
  //     if(!data.message){
  //       // this.updateChart(data);
  //     }else{
  //       console.log("streaming stop event")
  //     }
  //   });
  // }

}
