import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-mlflow',
  templateUrl: './mlflow.component.html',
  styleUrl: './mlflow.component.css',
  standalone: false
})
export class MlflowComponent implements OnInit, OnDestroy {
  mlflow_url: SafeResourceUrl = '';
  unsafeUrl: string = '';
  constructor(private storageService: StorageService, private sanitizer: DomSanitizer, private restApiService: RestApiService) {
    // this.mlflow_url = this.restApiService.getServerURL()
    // this.getServerURL()
    console.log('MLflow Component Constructor');
  }

  ngOnInit(): void {
    console.log('MLflow Component Initialized');
    // this.getServerURL()
    // Try to restore last visited URL
    const lastUrl = sessionStorage.getItem('mlflowUrl');
    if (lastUrl) {
      this.unsafeUrl = lastUrl;
      this.mlflow_url = this.sanitizer.bypassSecurityTrustResourceUrl(lastUrl);
    } else {
      this.getServerURL(); // Fetch from storage if no session data
    }
  }

  ngOnDestroy(): void {
    console.log('MLflow Component Destroyed');
    // Save last visited URL to sessionStorage
    if (this.unsafeUrl) {
      sessionStorage.setItem('mlflowUrl', this.unsafeUrl);
    }
  }

  getServerURL(){
    const storedDomain = this.storageService.getDomain('mlflow');
        if (!storedDomain) {
        } else {
          this.mlflow_url = this.sanitizer.bypassSecurityTrustResourceUrl(storedDomain.domain_name);
        }
        return this.mlflow_url;
    }

}
