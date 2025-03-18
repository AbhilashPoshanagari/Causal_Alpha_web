import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class GetStacksService {

  constructor(private restapi: RestApiService) { }

  startKafka(url){
    return new Promise((resolve, reject) =>{
      this.restapi.getService(url).subscribe((res:any) => {
        if(res.status == 200){
          resolve(res.data)
        }else{
          reject(res.status || 'Internal server problem')
        }
      })
    })
  }

  stoptKafka(url){
    return new Promise((resolve, reject) =>{
      this.restapi.getService(url).subscribe((res:any) => {
        if(res.status == 200){
          resolve(res.data)
        }else{
          reject(res.status || 'Internal server problem')
        }
      })
    })
  }
}
