import { Component, OnInit } from '@angular/core';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { AdminMainServiceService } from '../services/admin-main-service.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {

  constructor(
    public adminMainServices : AdminMainServiceService,
    private env: EnvServiceService
  ) { }

  ngOnInit() {
    this.adminMainServices.boardHeading ="Users Feedback";
    this.getallFeedback();
  }


  feedbackRespo:any = [];
  feedbackRespo2:any = [];


  getallFeedback(){

    let reqBody = {};
    reqBody["adminId"] = "hum";

    this.adminMainServices.apiService(this.env.mainUrl+"/getFeedback",reqBody).then((respo)=>{
      console.log("get feedback respo",respo);
      if(respo['success']){
        this.feedbackRespo = respo['data'];
        this.feedbackRespo2 = respo['data'];
      }
    });

  }

  filterUserFeedbackData(val){
    val = val.trim();

    if(val.length == 0){
      this.feedbackRespo = [...this.feedbackRespo2];
      return;
    }
    this.feedbackRespo = this.feedbackRespo2.filter((x)=>{
      // if((x.userDetailsFullName).toLowerCase().includes(val.toLowerCase())){
      if((x.name).toLowerCase().startsWith(val.toLowerCase()) || (x.email).toLowerCase().startsWith(val.toLowerCase())){
        return x;
      }
    });
  }

}
