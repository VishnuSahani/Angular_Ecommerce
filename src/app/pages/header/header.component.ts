import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainServiceService } from 'src/app/services/main-service.service';
import { UserConfirmDialogComponent } from '../user-confirm-dialog/user-confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public mainService:MainServiceService,
    private toastr:ToastrService,
    private routr: Router,
    private dialog:MatDialog) { }

    imageShow:any;

  ngOnInit() {
  }

  logoutUser(){

    let dialogRef = this.dialog.open(UserConfirmDialogComponent,{
      data: "Do you want to logout"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.mainService.userLoginStatus = false;
        // localStorage.setItem("ideal_user_data");
         localStorage.removeItem("ideal_user_data");
         this.routr.navigate(['/index/home']);
         this.toastr.success("You are successfully logout.")
      }
    });
    

  }


  checkOut(item){
    this.mainService.checkoutList = [item];
    this.routr.navigate(['/index/checkout']);
  }

}
