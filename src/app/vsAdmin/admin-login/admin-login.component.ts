import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  public eventSubject = new Subject<any>();
  count :number = 0;
  result:any;

  // 

  adminId : any = "admin";
  adminPassword : any = "123456";
  errorMsg = "";
  
  ngOnInit() {
    this.eventSubject.asObservable();

    this.eventSubject.subscribe((val)=>{
      console.log("First",val);
      this.result = val;
    });
  }

  adminLogin(){
    //alert("Hello")
    if(this.adminId == '' || this.adminId == undefined || this.adminId == null){
      this.errorMsg = "Admin Id is required";
      return;
    }else{
      this.errorMsg = "";

    }


    if(this.adminPassword == '' || this.adminPassword == undefined || this.adminPassword == null){
      this.errorMsg = "Admin password is required";
      return;
    }else{
      this.errorMsg = "";

    }

    if(this.adminId == 'admin'){
      if(this.adminPassword == '123456'){
        this.router.navigate(["/adminPanal"])

      }else{
        this.errorMsg = "Invalid Admin Password."

      }

    }else{
      this.errorMsg = "Invalid Admin Id."
    }


  }

  emitEvent() {
    this.count = this.count + 1;
    this.eventSubject.next(this.count);
    // this.eventSubject.subscribe((val)=>{
    //   this.result = val;
    // })
  }

}
