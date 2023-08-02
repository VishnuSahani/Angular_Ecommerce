import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private mainService : MainServiceService,
    private env : EnvServiceService,
    private toastr: ToastrService

  ) { }

  emailName:any;
  emailId:any;
  message:any;
  mobile:any;

  errorMsg:any;

  ngOnInit() {
    this.emailId = this.mainService.userLoginStatus? (this.mainService.userId).toLowerCase():"";
  }


  mailSend(){
    console.log(this.emailId);
    console.log(this.emailName);
    console.log(this.message);

    if(this.emailName == null || this.emailName == undefined || this.emailName == ""){
      alert("Please fill your name");
      this.errorMsg = "Please fill your name"
      return
    }

    if(this.mobile == null || this.mobile == undefined || this.mobile.length == 0){
      alert("Please fill your phone number");
      this.errorMsg = "Please fill phone number";
      return
    }

    if(this.message == null || this.message == undefined || this.message == ""){
      alert("Please fill your message");
      this.errorMsg = "Please fill your message";
      return
    }

    

    this.errorMsg = "";


    let reqBody = {
      "action":"sendEmail",
      "email":this.emailId,
      "name":this.emailName,
      "msg":this.message,
      "mobile":this.mobile
  }


    this.mainService.userApiMail(this.env.emailUrl,reqBody).then((respo)=>{
      console.log("email respo => ",respo);
      
    });

    this.mainService.userApiService(this.env.mainUrl+"/feedback",reqBody).then((respo)=>{
      if(respo['success']){
        this.toastr.success(respo['data'],"Success");
        this.emailId = "";
        this.emailName = "";
        this.message = "";
        this.mobile = "";
      }else{
        this.toastr.error(respo['data'],"Error Message");
      }

      this.errorMsg = respo['data'];

    });



  }

}
