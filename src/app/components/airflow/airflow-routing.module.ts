import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirflowComponent } from './airflow.component';
const routes: Routes = [
  {
    path: '',
    component: AirflowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirflowRoutingModule {}