import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MlflowComponent } from './mlflow.component';
const routes: Routes = [
  {
    path: '',
    component: MlflowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MlflowRoutingModule {}
