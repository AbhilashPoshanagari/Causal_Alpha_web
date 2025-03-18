import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirflowRoutingModule } from './airflow-routing.module'
import { AirflowComponent } from './airflow.component';
@NgModule({
  declarations: [AirflowComponent],
  imports: [
    CommonModule,
    AirflowRoutingModule
  ]
})
export class AirflowModule { }
