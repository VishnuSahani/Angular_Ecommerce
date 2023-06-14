import { Component, OnInit } from '@angular/core';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private mainService : MainServiceService,
    private env:EnvServiceService,

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

}
