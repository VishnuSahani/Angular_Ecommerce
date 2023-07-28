import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    public mainService : MainServiceService,
    private env:EnvServiceService,
    private toaster: ToastrService,
    private router:Router

  ) { }

  fullName:any ="";
  emailId:any ="";
  mobile:any ="";
  areaStreet:any ="";
  landmark:any ="";
  city:any ="";
  pinCode:any ="";
  state:any ="";
  shippingAmount = this.mainService.shippingAmount;
  subTotalAmount = 0;
  totalAmount = 0;

  mainUserData= {};

  ngOnInit() {
    this.getUserData();
    this.calCulateValue();
  }

  

  calCulateValue(){
    let tot = this.mainService.checkoutList.map((x)=>{
      // let val = 0;
      return x['buyQty'] * parseInt(x['productPrice']);
    })
    this.subTotalAmount = tot.reduce((acc, cur) => acc + Number(cur), 0);
    this.totalAmount = this.shippingAmount + this.subTotalAmount;  }

  getUserData(){
    let req = {"userEmail":this.mainService.userId};

    this.mainService.userApiService(this.env.mainUrl+"/get_SingleUserDetails",req).then((respo)=>{
      console.log(respo);
      let mainData = respo['data'][0];
      this.mainUserData = mainData;
      this.fullName = mainData.userDetailsFullName;
      this.emailId = mainData.userDetailsEmail;
      this.mobile = mainData.userDetailsMobile;
      this.areaStreet = mainData.userDetailsAreaStreet;
      this.landmark = mainData.userDetailsLandmark;
      this.city = mainData.userDetailsCity;
      this.pinCode = mainData.userDetailsPincode;
      this.state = mainData.userDetailsState;
    })
  }


  orderPlaced(){
    
    if(this.fullName == '' || this.fullName == null || this.fullName == undefined || this.fullName.length == 0){
      this.toaster.error("Please enter a full name","Name is required");
      return;
    }

    if(this.emailId == '' || this.emailId == null || this.emailId == undefined || this.emailId.length == 0){
      this.toaster.error("Please enter a Email Id","Email is required");
      return;
    }

    if(this.mobile == '' || this.mobile == null || this.mobile == undefined || this.mobile.length == 0){
      this.toaster.error("Please enter a Contact Number","Mobile number is required");
      return;
    }

    if(this.areaStreet == '' || this.areaStreet == null || this.areaStreet == undefined || this.areaStreet.length == 0){
      this.toaster.error("Please enter a Address 1","Address 1 is required");
      return;
    }

    if(this.landmark == '' || this.landmark == null || this.landmark == undefined || this.landmark.length == 0){
      this.toaster.error("Please enter a Address 2 / Landmark","Address 2 is required");
      return;
    }

    if(this.city == '' || this.city == null || this.city == undefined || this.city.length == 0){
      this.toaster.error("Please enter a City","City is required");
      return;
    }

    if(this.state == '' || this.state == null || this.state == undefined || this.state.length == 0){
      this.toaster.error("Please enter a State is","State is required");
      return;
    }

    if(this.pinCode == '' || this.pinCode == null || this.pinCode == undefined || this.pinCode.length == 0){
      this.toaster.error("Please enter a Pincode / ZIP code","ZIP Code is required");
      return;
    }


    let requestBody = {};

    requestBody['fullName'] = this.fullName;
    requestBody['emailId'] = this.emailId;
    requestBody['mobile'] = this.mobile;
    requestBody['areaStreet'] = this.areaStreet;
    requestBody['landmark'] = this.landmark;
    requestBody['city'] = this.city;
    requestBody['pinCode'] = this.pinCode;
    requestBody['state'] = this.state;
    requestBody['shippingAmount'] = this.shippingAmount;
    requestBody['subTotalAmount'] = this.subTotalAmount;
    requestBody['totalAmount'] = this.totalAmount;
    requestBody['userId'] = this.mainService.userId;
    requestBody['paymentMode'] = "Cash";
    requestBody['productList'] = this.mainService.checkoutList.map((x)=>{
      // let val = 0;
      return x['id']
    }).join(",");
    //buyQty
    requestBody['productQtyList'] = this.mainService.checkoutList.map((x)=>{
      // let val = 0;
      return x['buyQty']
    }).join(",");

    requestBody['productPriceList'] = this.mainService.checkoutList.map((x)=>{
      // let val = 0;
      return x['productPrice']
    }).join(",");

    this.mainService.userApiService(this.env.mainUrl+"/userOrderPlaced",requestBody).then((res) => {
      console.log("ORder palced",res);
      if(res['success']){
        this.toaster.success("Order Placed Successfully","Order Placed Successfully");
        this.router.navigate(['/index/myOrder'])
        // this.router.navigate(['/index/myOrder']);

      }else{
        this.toaster.error("Order Placed Failed! Try again","Order Placed Failed");
      }
    });
  }

}
