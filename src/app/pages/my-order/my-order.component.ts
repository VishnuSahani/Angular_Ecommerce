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

  getOrderDetails() {
    let reqBody = {};
    reqBody['userId'] = this.mainService.userId;

    this.mainService.userApiService(this.env.mainUrl + "/userOrderList", reqBody).then((response) => {
      console.log("order details: ", response);
      let mainData = [];
      if (response['success']) {
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

}
