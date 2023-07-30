import { Component, OnInit } from '@angular/core';
import { AdminMainServiceService } from '../services/admin-main-service.service';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private adminMainServices : AdminMainServiceService,
    private env:EnvServiceService,
    private toastr : ToastrService,
    private _sanitizer : DomSanitizer
  ) { }

  orderDetailsList = [
    // {"orderId":"IDL001","customerName":"Vishnu Sahani","orderItem":"Shoes","deliveryDate":"25-04-2000","price":"5000","quantity":"1","status":"Received","payment":"Cash"},
    // {"orderId":"IDL002","customerName":"Vishnu Sahani","orderItem":"Shoes2","deliveryDate":"25-04-2000","price":"5000","quantity":"5","status":"Received","payment":"Cash"}
  ];

  mainOrderList = [];
  expandId:any;

  ngOnInit() {
    this.adminMainServices.boardHeading ="Order Details";

    this.getAllOrderList();

  }

  expandTableRow(item){
    if(this.expandId == item.orderId){
      this.mainOrderList.map((x)=>{
        
          x['isExpand'] = false;
          this.expandId = "";
      
      });

    }else{
      this.expandId = item.orderId
      this.mainOrderList.map((x)=>{
        if(x.orderId == item.orderId){
          x['isExpand'] = true;
  
        }else{
          x['isExpand'] = false;
        }
      })

    }
   

  }


  getAllOrderList(){
    let reqBody ={};
    this.adminMainServices.apiService(this.env.mainUrl+"/userOrderList",reqBody).then((respo)=>{
      console.log("oreder Details list==>",respo);
      if(respo['success']){
        this.orderDetailsList = respo['data'];
        this.mainOrderList = [...respo['data']];
        this.mainOrderList.map((x)=>{
          x['isExpand'] = false;
          x['orderIdTmp'] = "IDL1000"+x['orderId'];
          let qtyarr = x['productQtyList'].split(',').map((y)=>{return parseInt(y)});
          x['productQuantityNew'] = qtyarr.reduce((a, b) => a + b, 0);

          x['productListInfo'].map((z)=>{
            z['productImage'] = z['productImage'];

            z['image'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ z['productImage'])

          });

          return x;
        });

        console.log("oreder Details list==>",this.mainOrderList);

      }else{
        this.toastr.error(respo['data'],"Error");
      }
    });
  }


  cancelOrderItem(item,orderIDObj){
    console.log(item); // item.id is primary key 
    console.log(orderIDObj); // item.id is primary key 
    let reqBody = {
      "email": orderIDObj.emailId,
      "orderId":orderIDObj.orderId,
      "itemId":item.id,
      "itemQty":item.productQuantity,
      "itemPrice":item.productPrice
      };

    this.adminMainServices.apiService(this.env.mainUrl + "/deleteOrderItem",reqBody).then((respo)=>{
      console.log("cancelOrder",respo);
      // / yaha kam baki h

      if(respo['success']){
        this.getAllOrderList();
        
        this.toastr.success(respo['data'],"Success Message")
      }else{
        this.toastr.error(respo['data'],"Error Message")
      }

      
    })

  }

  changeOrderStatus(value,itemObj){
    console.log(itemObj);

    let reqBody = {};
    reqBody['orderId'] = itemObj.orderId;
    reqBody['email'] = itemObj.emailId;
    reqBody['orderStatus'] = value;

    this.adminMainServices.apiService(this.env.mainUrl+"/changeOrderStatus",reqBody).then((respo)=>{
      console.log("order status change",respo);
      if(respo['success']){

        this.toastr.success(respo['data'],"Order ID IDL1000"+itemObj.orderId)
        
      }else{
        this.toastr.error(respo['data'],"Error message")

      }
    });

  }


  filterOrderData(val){
    
    val = val.trim();

    if(val.length == 0){
      this.mainOrderList = [...this.orderDetailsList];
      return;
    }
    this.mainOrderList = this.orderDetailsList.filter((x)=>{
      // if((x.orderIdTmp).toLowerCase().includes(val.toLowerCase())){
      if((x.orderIdTmp).toLowerCase().startsWith(val.toLowerCase()) || (x.mobile).toLowerCase().startsWith(val.toLowerCase()) || (x.shippingStatus).toLowerCase().startsWith(val.toLowerCase()) ){
        return x;
      }
    })
  }

}
