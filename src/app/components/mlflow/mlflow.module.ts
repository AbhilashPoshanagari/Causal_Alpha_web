import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { MlflowComponent } from './mlflow.component';
import { MlflowRoutingModule } from './mlflow-routing.module';

@NgModule({
  declarations: [MlflowComponent],
  imports: [
    CommonModule,
    MlflowRoutingModule
  ],
  exports: [],
  providers: []
  
})
export class MlflowModule { }
