import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
    private dialog:MatDialog) { }

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
         this.toastr.success("You are successfully logout.")
      }
    });
    

  }

}
