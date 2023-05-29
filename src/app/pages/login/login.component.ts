import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router:Router,
    private env : EnvServiceService,
    public mainService : MainServiceService,
    private toastr:ToastrService
  ) { }

  username:any;
  password:any;

  email_id:any;

  showMsg={"status":true,"msg":""};
  pageName = "login"
  pageName2 = "true"

  ngOnInit() {
  }

  singnUpClick(){

    this.router.navigate['index/signUp'];

  }

  loginSubmit(){
    // this.username = this.username.trim();
    if(this.username == "" || this.username == null || this.username == undefined || this.username.length == 0){
      this.showMsg['status'] = false;
      this.showMsg['msg'] = "Username is required";
      return;

    }

    if(this.password == "" || this.password == null || this.password == undefined || this.password.length == 0 ){
      this.showMsg['status'] = false;
      this.showMsg['msg'] = "Password is required";
      return

    }

    // this.showMsg['msg'] = "Password is required";

    let apiUrl = this.env.mainUrl+"/userLogin";

    let data = {
      "username":this.username,
      "password":this.password
    };

    this.mainService.userApiService(apiUrl,data).then((respo)=>{
      console.log(respo);

      this.showMsg['msg'] = respo['data'];

      if(respo['success']){        
        this.showMsg['status'] = true;
        this.mainService.userLoginStatus = true;
        this.mainService.userName = respo['userName'].toUpperCase();
        this.mainService.userId = respo['userId'].toUpperCase();

        // let encoded = window.btoa(text);
        // let decoded = window.atob(encoded);
        data['loginTrue'] = true;
        data['userName'] = respo['userName'].toUpperCase();

        let lData = window.btoa(JSON.stringify(data));
        localStorage.setItem("ideal_user_data", lData);

        // this.router.navigate['index/home'];
        this.router.navigate([`../index/home/`]);


      }else{
        this.showMsg['status'] = false;
        this.toastr.error(this.showMsg['msg'],"Error")
      }
      
    });



  }

}
