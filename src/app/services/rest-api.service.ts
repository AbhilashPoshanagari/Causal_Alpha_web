import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { StorageService } from './storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  prediction_data: Array<any> = []
  actual_data: Array<any> = []
  mlflow_url: SafeResourceUrl = '';
  api_res: Array<any> = []
  constructor(private http: HttpClient, private storageService: StorageService, private sanitizer: DomSanitizer) { }

  getService(url: string){
    return this.http.get(url)
  }

  postService(url: string, data: any){
    return this.http.post(url, data)
  }

  setResponse(data: any){
    this.api_res = data;
  }

  getResponse(){
    return this.api_res;
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
