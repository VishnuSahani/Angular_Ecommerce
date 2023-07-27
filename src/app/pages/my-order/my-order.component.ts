import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  constructor(
    private mainService: MainServiceService,
    private env: EnvServiceService,
    private _sanitizer : DomSanitizer,

  ) { }

  ngOnInit() {
    this.getOrderDetails();
  }

  orderDetailsList = [];
  mainOrderList = [];
  expandId:any;


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

  getOrderDetails() {
    let reqBody = {};
    reqBody['userId'] = this.mainService.userId;

    this.mainService.userApiService(this.env.mainUrl + "/userOrderList", reqBody).then((response) => {
      console.log("order details: ", response);
      let mainData = [];
      if (response['success']) {
        this.mainOrderList = [...response['data']];

        // new 

        this.mainOrderList.map((x)=>{
          x['isExpand'] = false;
          let qtyarr = x['productQtyList'].split(',').map((y)=>{return parseInt(y)});
          x['productQuantityNew'] = qtyarr.reduce((a, b) => a + b, 0);

          x['productListInfo'].map((z)=>{
            z['productImage'] = z['productImage'];

            z['image'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ z['productImage'])

          });

          return x;
        });

        console.log("this.mainOrderList==vishnu",this.mainOrderList);
        
        // end new

        mainData = response['data'];
        mainData.forEach((item) => {
          


          item['productListInfo'].forEach((subItem) => {
            let obj = {};

            obj['productName'] = subItem['productName'];
            obj['productDetails'] = subItem['productDetails'];
            obj['productPrice'] = parseInt(subItem['productPrice']) * parseInt(subItem['productQuantity']);
            obj['productQuantity'] = parseInt(subItem['productQuantity']);
            obj['productImage'] = subItem['productImage'];

            obj['image'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ subItem['productImage'])

            // 

            obj['orderId'] = item['orderId'];
            obj['fullName'] = item['fullName'];
            obj['mobile'] = item['mobile'];

            obj['areaStreet'] = item['areaStreet'];
            obj['landmark'] = item['landmark'];
            obj['city'] = item['city'];
            obj['pinCode'] = item['pinCode'];
            obj['state'] = item['state'];
            obj['shippingAmount'] = item['shippingAmount'];
            obj['subTotalAmount'] = item['subTotalAmount'];
            obj['totalAmount'] = item['totalAmount'];
            obj['paymentMode'] = item['paymentMode'];
            obj['shippingStatus'] = item['shippingStatus'];
            obj['createdDate'] = item['createdDate'];
            this.orderDetailsList.push(obj);

          });


        });

        console.log("********************************",this.orderDetailsList)

      }

    });

  }

  cancelOrderItem(item,orderIDObj){
    console.log(item); // item.id is primary key 
    console.log(orderIDObj); // item.id is primary key 
    let reqBody = {
      "email":this.mainService.userId,
      "orderId":orderIDObj.orderId,
      "itemId":item.id,
      "itemQty":item.productQuantity,
      "itemPrice":item.productPrice
      };

    this.mainService.userApiService(this.env.mainUrl + "/deleteOrderItem",reqBody).then((respo)=>{
      console.log("cancelOrder",respo);
      // / yaha kam baki h
      
    })

  }

}
