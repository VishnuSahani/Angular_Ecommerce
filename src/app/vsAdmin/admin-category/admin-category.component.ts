import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AdminAddCategoryComponent } from '../dialog/admin-add-category/admin-add-category.component';
import { AdminEnvService } from '../services/admin-env.service';
import { AdminMainServiceService } from '../services/admin-main-service.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  constructor(
    public adminMainServices:AdminMainServiceService,
    private adminEnv : AdminEnvService,
    private _sanitizer : DomSanitizer,
    private dialog:MatDialog,
    private toastrService:ToastrService
    ) { }

  ngOnInit() {
    this.adminMainServices.boardHeading ="Category Details";
    this.getCategoryData();

  }
  categoryData:any =[];

  addCategory(isNew,data={}){
    let dialogData ={};
    dialogData['isNew'] = isNew;

    if(!isNew){
      dialogData['mainData'] = [data];
    }

    let dialogRef = this.dialog.open(AdminAddCategoryComponent,{
      disableClose: true,
      width:"550px",
      data:dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategoryData();

    });
  }

  getCategoryData(){
    let bodyReq = {"adminId":"hum"};
   this.adminMainServices.apiService(this.adminEnv.mainUrl+"/get_category",bodyReq).then((respo)=>{
     console.log(respo);
     if(respo['success']){
       let mainData = respo['data'];
       mainData.map(x=>{
         if(x['image'] !=''){
           //this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
          //  + chartData['data']);
          x['imageBase64'] = x['image'];
           x['image'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x['image'])
         }
         return x
       });

       this.categoryData = mainData;

       console.log("mainData==",mainData);
     }
   })
  }

  forConfirm(item){
    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: item.category_name
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deletCategory(item);
      }
    });
  }


  deletCategory(item){

    let reqBody ={};
    reqBody['categoryName']= item.category_name;
    reqBody['categoryId']= item.id;

    this.adminMainServices.apiService(this.adminEnv.mainUrl+"/delete_category",reqBody).then((respo)=>{
      console.log("delete respo =",respo);
      if(respo['success']){
        this.getCategoryData();
      }

    })

  }

  changeCategoryStatus(item){

    let reqBody ={};
    reqBody['categoryStatus']= item.status ==1?0:1;
    reqBody['categoryId']= item.id;

    this.adminMainServices.apiService(this.adminEnv.mainUrl+"/changeStatus_category",reqBody).then((respo)=>{
      console.log("status change respo =",respo);
      if(respo['success']){
        this.toastrService.success(respo['data'],"Success Message");
        this.getCategoryData();
      }else{
        this.toastrService.error(respo['data'],"Error Message");
      }

    })

  }



}
