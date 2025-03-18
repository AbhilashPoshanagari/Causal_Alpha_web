import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { RestApiService } from './services/rest-api.service';
import { AirflowModule } from './components/airflow/airflow.module';
import { MlflowModule } from './components/mlflow/mlflow.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from './services/storage.service';
import { DomainDialogComponent } from './components/domain-dialog/domain-dialog.component';
import { CustomReuseService } from './services/custom-reuse.service';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HomePageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AirflowModule,
    MlflowModule,
    MatToolbarModule,
    MatIconModule,
    DomainDialogComponent
  ],
  providers: [provideHttpClient(), RestApiService, provideAnimationsAsync(), StorageService, { provide: RouteReuseStrategy, useClass: CustomReuseService}],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
