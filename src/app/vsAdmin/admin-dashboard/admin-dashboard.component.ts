import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MainServiceService } from 'src/app/services/main-service.service';
import { AdminAddCategoryComponent } from '../dialog/admin-add-category/admin-add-category.component';
import { AdminMainServiceService } from '../services/admin-main-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  constructor(
    public mainService : MainServiceService,
    public adminMainService:AdminMainServiceService,
    public dialog :MatDialog,
    private http : HttpClient
    ) { }

  ngOnInit() {
    this.mainService.setUserTopHeader(false);
    this.adminMainService.boardHeading ="Dashboard";
  }

  ngOnDestroy(): void {
    this.mainService.setUserTopHeader(true);

  }

  addCategory(){
    this.dialog.open(AdminAddCategoryComponent,{
      disableClose: true,
      width:"550px",
      data:{"isNew":true}
    })
  }


}
