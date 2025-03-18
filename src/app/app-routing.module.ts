import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MlflowComponent } from './components/mlflow/mlflow.component';
import { HomePage } from './home/home.page';
import { AirflowComponent } from './components/airflow/airflow.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'dags',
    component: AirflowComponent,
  },{
    path: 'mlflow',
    component: MlflowComponent,
    data: { reuse: true }
  }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
