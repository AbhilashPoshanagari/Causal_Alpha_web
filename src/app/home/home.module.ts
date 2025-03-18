import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TimeSeriesChartComponent } from '../components/time-series-chart/time-series-chart.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgCharts } from 'ag-charts-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MlTimeSeriesComponent } from '../components/ml-time-series/ml-time-series.component';
import { NgApexchartsModule } from "ng-apexcharts"
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

// import { CustomRouteReuseStrategy } from '../services/custom-route-reuse-strategy';
// import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AgGridModule,
    AgCharts,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    TimeSeriesChartComponent,
    MlTimeSeriesComponent,
    RouterModule,
    AppRoutingModule,
    HeaderModule,
    MatDialogModule
    ],
  exports:[],
  providers: [
    // { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
})
export class HomePageModule {}
