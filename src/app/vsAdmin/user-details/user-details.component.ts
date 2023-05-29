import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AdminEnvService } from '../services/admin-env.service';
import { AdminMainServiceService } from '../services/admin-main-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private mainService:MainServiceService,
    private env:EnvServiceService,
    private _sanitizer : DomSanitizer,
    private dialog : MatDialog,
    private adminMainServices:AdminMainServiceService,
    private adminEnv : AdminEnvService,
    private toastr: ToastrService

  ) { }

  userDetailsList = [];

  ngOnInit() {

    this.getUserDetails();
  }



  getUserDetails(){
    let apiUrl = this.env.mainUrl+"/get_UserDetails";
    let requestBody = {"adminId":"hum"};


    this.mainService.userApiService(apiUrl,requestBody).then((respo)=>{
      console.log("User details",respo);  
      if(respo['success']){

        let mainData = respo['data'];

        mainData.map(x=>{
          if(x['userdetailsPhoto'] !='' && x['userdetailsPhoto'] !=null){
          
           x['imageBase64'] = x['userdetailsPhoto'];
            x['userdetailsPhoto'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+ x['userdetailsPhoto'])
          }

          return x
        });

        this.userDetailsList = mainData;
      }    
    });
  }

  forDeleteConfirm(item){

    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: item.userDetailsFullName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deletCustomer(item);
      }
    });

  }

  deletCustomer(item){

    let reqBody ={};
    reqBody['adminId']= "hum";
    reqBody['email']= item.userDetailsEmail;

    this.adminMainServices.apiService(this.adminEnv.mainUrl+"/delete_UserDetails",reqBody).then((respo)=>{
      console.log("delete respo =",respo);
      if(respo['success']){
        this.toastr.success(respo['msg'],"Success")
        
        this.getUserDetails();
      }else{

        this.toastr.error(respo['msg'],"Error")
      }

    })

  }

}
