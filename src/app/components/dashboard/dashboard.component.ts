import { Component, OnInit, NgZone, AfterContentInit, ChangeDetectorRef } from '@angular/core';
// import * as Highcharts from 'highcharts/highstock';
import * as Highcharts from 'highcharts';
import { RestApiService } from '../../services/rest-api.service';
// import { api_url, websocket_url } from '../../constants/api-urls';
import { WebsocketService } from '../../services/websocket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { HighchartsChartModule } from 'highcharts-angular';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-dashboard',
  imports: [HighchartsChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit, AfterContentInit{
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  predictOptions: Highcharts.Options = {};
  private socket$: WebSocketSubject<any> | undefined;
  // chartInstance!: Highcharts.Chart;
  stock_data: Array<Array<number>> = [[]];
  api_url: string = '';
  constructor(private cdr: ChangeDetectorRef, private storageService: StorageService,
    private ngZone: NgZone, private restapi: RestApiService, 
    private ws: WebsocketService){
      this.getServerURL()
  }
  ngOnInit(){
    this.ngZone.run(() => {
      this.loadLineChart()
      this.predictionChart()
    })
  }

  getServerURL(){
    const storedDomain = this.storageService.getDomain('fast_api');
        if (!storedDomain) {
        } else {
          this.api_url = storedDomain.domain_name;
        }
    }

  ngAfterContentInit(): void {
  }

  loadLineChart() {
    Highcharts.setOptions({
      accessibility: {
        enabled: false  // Disable accessibility module
      }
    });
    
    this.restapi.getService(this.api_url+"datasets/trained_data").subscribe((res:any) => {
      if(res.status == 200){
        const chartData = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Close"]]);
        console.log("chart Data : ", chartData)
        setTimeout(() => {
          this.chartOptions = {
            title: { text: 'Stock Price Over Time' },
            xAxis: { type: 'datetime' },
            yAxis: { title: { text: 'Close Price' } },
            series: [{
              name: 'Stock Price',
              data: chartData,
              type: 'line'
            }]
          };
          this.cdr.detectChanges();  // Force Angular to detect changes
        }, 200);
        
      }
      
    })
  }

  predictionChart(){
    Highcharts.setOptions({
      accessibility: {
        enabled: false  // Disable accessibility module
      }
    });
    this.restapi.getService(this.api_url+"mlflow/predict").subscribe((res:any) => {
      if(res.status == 200){
        const actual_price = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Actual_price"]]);
        const predicted_price = res.data.map((point:any) => [new Date(point["Date"]).getTime(), point["Predicted_price"]]);
        setTimeout(() => {
        this.predictOptions = {
          title: { text: 'Stock Price Prediction on LSTM' },
          xAxis: { type: 'datetime' },
          yAxis: { title: { text: 'Close Price' } },
          series: [{
            name: 'Actual Stock Price',
            data: actual_price,
            type: 'line',
            color: 'blue'
          },
          {
            name: 'Predicted Stock Price',
            data: predicted_price,
            type: 'line',
            color: 'red'
          }]
        };
        this.cdr.detectChanges();  // Force Angular to detect changes
      }, 200);

      }
      
    })
  }

  start(){
    this.restapi.getService(this.api_url+'kafka/start').subscribe((res: any) => {
      if(res.message == "WebSocket streaming started"){
        console.log(res);
      }
    })
  }

  stop(){
    this.restapi.getService(this.api_url+'kafka/stop').subscribe((res: any) => {
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

  // saveInstance(chart: Highcharts.Chart) {
  //   this.chartInstance = chart;
  // }

  // updateChart(newData: { open: string, high: string, low: string, close:string }) {
  //   if (this.chartInstance) {
  //     const timestamp = new Date().getTime(); // Current timestamp for X-axis
  //     const formattedData = [
  //       timestamp,
  //       parseFloat(newData.open), 
  //       parseFloat(newData.high), 
  //       parseFloat(newData.low), 
  //       parseFloat(newData.close)
  //     ];
  //     this.chartInstance.series[0].addPoint(
  //       formattedData, 
  //       true, 
  //       this.chartInstance.series[0].data.length > 20);
  //   }
  // }  

  // prepareData(stackData: any){
  //   console.log("Message from server:", stackData);
  //   let open = parseFloat(stackData.open)
  //   let high = parseFloat(stackData.high)
  //   let low = parseFloat(stackData.low)
  //   let close = parseFloat(stackData.close)
  //   this.stock_data.push([Date.now(), open, high, low, close])
  // }

  // loadCandlestickChart() {
  //   Highcharts.stockChart('candlestickChart', {
  //     rangeSelector: { selected: 1 },
  //     title: { text: 'Candlestick Chart' },
  //     series: [{
  //       type: 'candlestick',
  //       name: 'Stock Price',
  //       data: [
  //         [1700000000000, 100, 120, 90, 110],
  //         [1700086400000, 110, 130, 100, 125]
  //       ]
  //     }]
  //   });
  // }
  
    // webSocket(){
  //   const socket = new WebSocket(websocket_url);
  //   socket.onopen = () => {
  //     console.log("WebSocket connection opened!");
  //     socket.send("Hello, server!");
  //     return 'connected'
  //   };

  //   socket.onmessage = (event) => {
  //     // console.log("Message from server:", event.data);
  //     // this.prepareData(JSON.parse(event.data))
  //     this.updateChart(JSON.parse(event.data))
  //     return event.data;
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //     return error;
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //     return 'disconnected'
  //   };
  // }
}
