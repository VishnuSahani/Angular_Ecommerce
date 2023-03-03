import { MatDialog } from '@angular/material';
import { Component, Input, OnInit,OnChanges ,Output, EventEmitter} from '@angular/core';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { AdminMainServiceService } from '../services/admin-main-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent implements OnInit,OnChanges {

  @Input() productValue={};
  @Output() newItemEvent = new EventEmitter<any>();


  constructor(
    private env:EnvServiceService,
    private mainService : AdminMainServiceService,
    private dialog : MatDialog,
    private router : Router
  ) {
    console.log("conn")
  }

  featuresItems = [];//[1,2,3,4,5,6,7,8]
  singleProductDetails = {};

  ngOnInit() {
    console.log("productValue==>",this.productValue);
    this.featuresItems = this.productValue['data'];
  }

  ngOnChanges() {
    // create header using child_id
    console.log("on change = ",this.productValue);
  }

  changeProductStatus(status,productDetails){

    let reqBody = {};
    let url = this.env.mainUrl+"/changeStatus_product";
    reqBody['productId']= productDetails['id'];

    if(status){
      reqBody['productStatus']= 1;

    }else{
      reqBody['productStatus']= 0;

    }


    this.mainService.apiService(url,reqBody).then((respo)=>{
      console.log(respo);
      respo['label'] = "status change";
      this.newItemEvent.emit(respo);
    })

  }

  forDeleteConfirm(item){
    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: item.productName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteProduct(item);
      }
    });
  }

  deleteProduct(productDetails){
    console.log("delete product",)
    let reqBody = {};
    let url = this.env.mainUrl+"/delete_product";
    reqBody['productId']= productDetails['id'];

    this.mainService.apiService(url,reqBody).then((respo)=>{
      console.log(respo);
      respo['label'] = "Product Delete";
      this.newItemEvent.emit(respo);
    })
  }

  editProductDetails(productDetails){

    let navigationExtras : NavigationExtras = {
      queryParams:{
        "isEdit":true
      }
    }

    this.mainService.productEditData = productDetails;

    this.router.navigate(['adminPanal/addProduct'],navigationExtras)

  }

}
