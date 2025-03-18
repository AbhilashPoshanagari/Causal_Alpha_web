import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-angular';

@Component({
  selector: 'app-time-series-chart',
  templateUrl: './time-series-chart.component.html',
  styleUrls: ['./time-series-chart.component.scss'],
  standalone: true,
  imports: [AgCharts]
})
export class TimeSeriesChartComponent  implements OnInit {
      public chartOptions: AgChartOptions;

      // Row Data: The data to be displayed.
      rowData = [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      ];
  constructor() { 
    this.chartOptions = {
      title: {
        text: 'BTC/USD Price Over Time',
      },
      data: this.getData(),
      series: [
        {
          type: 'line',
          xKey: 'time',
          yKey: 'price',
        },
      ],
      axes: [
        {
          type: 'time',
          position: 'bottom',
        },
        {
          type: 'number',
          position: 'left',
        },
      ],
    };
    console.log("Time series data ")
  }

  ngOnInit() {}

  getData() {
    // Sample time-series data
    return [
      { time: new Date('2023-10-01'), price: 27000 },
      { time: new Date('2023-10-02'), price: 27500 },
      { time: new Date('2023-10-03'), price: 28000 },
      { time: new Date('2023-10-04'), price: 28500 },
      { time: new Date('2023-10-05'), price: 29000 },
      { time: new Date('2023-10-06'), price: 29500 },
      { time: new Date('2023-10-07'), price: 30000 },
      { time: new Date('2023-10-08'), price: 30500 },
      { time: new Date('2023-10-09'), price: 31000 },
      { time: new Date('2023-10-10'), price: 31500 },
      { time: new Date('2023-10-11'), price: 40000 },
      { time: new Date('2023-10-12'), price: 45000 },
      { time: new Date('2023-10-13'), price: 45500 },
      { time: new Date('2023-10-14'), price: 50000 }
    ];
  }

}
