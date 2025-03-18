import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-airflow',
  templateUrl: './airflow.component.html',
  styleUrl: './airflow.component.css',
  standalone: false
})
export class AirflowComponent implements OnInit {
  dag_url: SafeResourceUrl = ''

  constructor(private storageService: StorageService, private sanitizer: DomSanitizer) {
    this.getServerURL()
  }

  ngOnInit(): void {
    console.log("ML FLOW")
    this.getServerURL();
  }

  getServerURL(){
    const storedDomain = this.storageService.getDomain('dag');
        if (!storedDomain) {
        } else {
          this.dag_url = this.sanitizer.bypassSecurityTrustResourceUrl(storedDomain.domain_name);
        }
    }

}
