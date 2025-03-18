import { Component, OnInit } from '@angular/core';
import { Domain } from '../models/domain';
import { StorageService } from '../services/storage.service';
import { MatDialog } from '@angular/material/dialog';
// import { DomainDialogComponent } from '../components/domain-dialog/domain-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit{
  domainName: string = '';

  // constructor(private storageService: StorageService, public dialog: MatDialog) {}

  ngOnInit() {
    // const storedDomain = this.storageService.getDomain();
    // if (!storedDomain) {
    //   this.openDomainDialog();
    // } else {
    //   this.domainName = storedDomain.domain_name;
    // }
  }

  // openDomainDialog() {
  //   const dialogRef = this.dialog.open(DomainDialogComponent, {
  //     width: '250px',
  //     disableClose: false // Prevent closing without input
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.domainName = result;
  //       this.storageService.saveDomain({ domain_name: result });
  //     }
  //   });
  // }

}
