import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { AdminAddProductComponent } from '../dialog/admin-add-product/admin-add-product.component';
import { AdminMainServiceService } from '../services/admin-main-service.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private adminMainServices:AdminMainServiceService,
    private router:Router,
    private env:EnvServiceService,
    private _sanitizer : DomSanitizer
  ) { }

  displayDataObject ={
    "data":[]
  };

  ngOnInit() {
    this.adminMainServices.boardHeading ="Product Details";
    this.displayDataObject['details'] = "byAdmin";
    this.displayDataObject['title'] = "All Product Details";

    this.getProductDetails();
  }

  addProduct(isNew){

    // this.dialog.open(AdminAddProductComponent,{
    //   width:"700px",
    //   data:{"isNew":isNew}
    // })

    this.router.navigate(['adminPanal/addProduct'])

  }

  addItem(e){
    console.log("in parent component = ",e);
    this.displayDataObject['data'] = [];
    if(e.success){
      this.getProductDetails();
    }

  }


  getProductDetails(){

    let url = this.env.mainUrl+'/get_product';
    let reqBody = {"adminId":'hum'};

    this.adminMainServices.apiService(url,reqBody).then((respo)=>{
      console.log(respo);
      let mainData = respo['data'];
      mainData.map(x=>{
        if(x['productImage'] !='' && x['productImage'] !=null){
          //this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
         //  + chartData['data']);
         x['imageBase64'] = x['productImage'];
          x['productImage'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+ x['productImage'])
        }

        let price = parseInt(x['productPrice']);
        let discount =  parseInt( x['productDiscount']);

        if(x['productDiscountType']=='pct'){
          let val =0 ;
          val = (price * discount)/100

          x['displayPrice'] = price - val;

        }else{
          x['displayPrice'] = price - discount;

        }
        return x
      });
      this.displayDataObject['data'] = mainData;
    })
  }


}
