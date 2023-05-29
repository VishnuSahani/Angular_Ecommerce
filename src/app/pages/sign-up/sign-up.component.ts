import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private env: EnvServiceService,
    private userMainService : MainServiceService,
    private toastr: ToastrService
  ) { }

  registerForm:FormGroup;
  showErrorMsg:string = ''
  showSuccessMsg:any = ''


  ngOnInit() {
    this.newForm();
  }

  newForm() {
    this.registerForm = this.fb.group({
      fullName:['',Validators.required],
      // categoryId: ['',],
      email_id: [ '', 
      Validators.email
    ],
      mobile: ["", [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      
      dob:['',Validators.required],
      password:['',Validators.required],
      gender:['Male',Validators.required],

    });
  }


  registerFormSubmit(){
    let reqBody = this.registerForm.value;

    console.log(reqBody);

    let fullName = reqBody['fullName'];
    let email_id = reqBody['email_id'];
    let mobile = reqBody['mobile'];
    let password = reqBody['password'];
    let dob = reqBody['dob'];
    let gender = reqBody['gender'];

    if(fullName.length ==0 || fullName == undefined || fullName == null){
      this.showErrorMsg ="Your Full Name is required";
      return;
    }

    if(email_id.length ==0 || email_id == undefined || email_id == null){
      this.showErrorMsg ="Email is required";
      return;
    }

    if(mobile.length ==0 || mobile == undefined || mobile == null){
      this.showErrorMsg ="Mobile number is required";
      return;
    }

    if(password.length ==0 || password == undefined || password == null){
      this.showErrorMsg ="Password is required";
      return;
    }

    if(dob.length ==0 || dob == undefined || dob == null){
      this.showErrorMsg ="DOB is required";
      return;
    }


    let apiUrl = this.env.mainUrl+"/userSignUp";

    let data={
      "email": email_id.toLowerCase(),
      "mobile": mobile,
      "fullName": fullName,
      "password": password,
      "dob": dob,
      "gender": gender      
    };

    this.showErrorMsg = "";


    this.userMainService.userApiService(apiUrl,data).then((respo)=>{
      console.log(respo);
      if(respo['success']){

        this.showSuccessMsg = respo['data'];
        this.newForm();
        this.toastr.success(this.showSuccessMsg,"Success")

      }else{
        this.showErrorMsg =  respo['data'];
        this.toastr.error(this.showErrorMsg,"Error")

      }
      
    });




  }

}
