import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { StorageService } from './services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DomainDialogComponent } from './components/domain-dialog/domain-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { RestApiService } from './services/rest-api.service';

interface MenuItems{
  name: string;
  route: string;
  domain: string;
  server: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements OnInit{
  title = 'CDS_causal_alpha';
  isMenuVisible = true;
  menuItems: Array<MenuItems> = [
    { name: 'Home', route: '/home', domain: "+", server: 'fast_api' },
    { name: 'Dags', route: '/dags', domain: "+", server: 'dag'},
    { name: 'MLflow', route: '/mlflow', domain: "+", server: 'mlflow' }
  ];
  fast_api_url: string = '';
  constructor(private router: Router, private storageService: StorageService, private restApiService: RestApiService,
    public dialog: MatDialog, private sanitizer: DomSanitizer ) {}

  ngOnInit(): void {
    this.navigateTo('/home')
    for (let i = 0; i < this.menuItems.length; i++) {
      const domain = this.getServerURL(this.menuItems[i].server)
      this.menuItems[i].domain = domain;
    }
  }
  getServerURL(domain: string){
    const storedDomain = this.storageService.getDomain(domain);
        if (!storedDomain) {
          return '+'
        } else {
          if(domain == 'mlflow'){
            this.connectMLtoFastApi(storedDomain.domain_name)
          }
          return storedDomain.domain_name;
        }
    }

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    }
  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }

    addDomain(){
      console.log("domain : ")
    }

    openDomainDialog(index: any) {
      const domain = this.menuItems[index].domain != "+"? this.menuItems[index].domain: "";
      const dialogRef = this.dialog.open(DomainDialogComponent, {
        width: '250px',
        disableClose: false, // Prevent closing without input
        data: {domain: domain || '', page: this.menuItems[index].server}
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result.server) {
          this.menuItems[index].domain = result.server;
          this.storageService.saveDomain({ domain_key: this.menuItems[index].server, domain_name: result.server });
          if(result.page == 'mlflow'){
            this.connectMLtoFastApi(result.server);
          }
        }
      });
    }

    connectMLtoFastApi(mlflow_ip: string){
      const storedDomain = this.storageService.getDomain('fast_api');
          if (!storedDomain) {
            console.log("server not connected")
          } else {
            storedDomain.domain_name;
            this.restApiService.postService(storedDomain.domain_name + "/mlflow", {mlflow_ip: mlflow_ip}).subscribe((res: any) => {
              if(res.status == 200){
                console.log(res.data)
                sessionStorage.setItem('mlflowUrl', mlflow_ip);
              }else{
                console.log("Error : ", res.data)
              }
            })
          }
      }
}
