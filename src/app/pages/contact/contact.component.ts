import { Component, OnInit } from '@angular/core';
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
    private env : EnvServiceService

  ) { }

  emailName:any;
  emailId:any;
  message:any;

  ngOnInit() {
  }


  mailSend(){
    console.log(this.emailId);
    console.log(this.emailName);
    console.log(this.message);

    if(this.emailName == null || this.emailName == undefined || this.emailName == ""){
      alert("Please fill your name");
    }

    if(this.message == null || this.message == undefined || this.message == ""){
      alert("Please fill your message");
    }

    let reqBody = {
      "action":"sendEmail",
      "email":this.emailId,
      "name":this.emailName,
      "msg":this.message
  }


    this.mainService.userApiMail(this.env.emailUrl,reqBody).then((respo)=>{
      console.log("email respo => ",respo);
      
    })



  }

}
