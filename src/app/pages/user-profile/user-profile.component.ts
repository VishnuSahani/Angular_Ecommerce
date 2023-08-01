import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  mainUserData: any = {};
  userDetails:FormGroup;
  base64textString:any="";
  imageShow:any="";
  // imageShow:any="assets/img/profilePhoto/Profile-Male.png";

  constructor(
    public mainService:MainServiceService,
    private env : EnvServiceService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private _sanitizer:DomSanitizer


  ) { }

  stateArr = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]

  ngOnInit() {
    this.newForm();
    this.getUserData();
  }

  newForm(){
    this.userDetails = this.fb.group({
      fullName:["",Validators.required],
      // categoryId: ['',],
      email_id: [ "", 
      Validators.email
    ],
      mobile: ["", [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      
      dob:["",Validators.required],
      password:["",Validators.required],
      gender:["",Validators.required],

      areaStreet:["",Validators.required],
      landmark:["",Validators.required],
      city:["",Validators.required],
      pinCode:["",Validators.required],

      state:["",Validators.required],
    
    });
  }


  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file && (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {

      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);


    } else {
      alert("Please select only png, jpg, jpeg formate image only")
    }


  }
  
_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
         console.log(btoa(binaryString));
         this.imageShow = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ this.base64textString)

 }


  getUserData(){
    let req = {"userEmail":this.mainService.userId};

    this.mainService.userApiService(this.env.mainUrl+"/get_SingleUserDetails",req).then((respo)=>{
      console.log(respo);
      let mainData = respo['data'][0];
      this.mainUserData = mainData;
      this.imageShow =  this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ this.mainUserData['userdetailsPhoto'])
      this.userDetailsForm();
   
    })
  }


  userProfileSubmit(){
    console.log("okk",this.userDetails);
    if(this.userDetails.touched && this.userDetails.status =="VALID"){
      let reqBody = this.userDetails.value;

      // reqBody['fullName'] = this.mainService.userId;
      // reqBody['dob'] = this.mainService.userId;
      // reqBody['gender'] = this.mainService.userId;
      // reqBody['areaStreet'] = this.mainService.userId;
      // reqBody['landmark'] = this.mainService.userId;
      // reqBody['city'] = this.mainService.userId;
      // reqBody['pinCode'] = this.mainService.userId;
      // reqBody['state'] = this.mainService.userId;
      
      reqBody['email'] = this.mainService.userId;


    //   {
    //     "mobile": "9807475586",
    //     "password": "123456789",
    // }

    this.mainService.userApiService(this.env.mainUrl+'/userDetailsUpdate',reqBody).then((respo)=>{
      console.log("user details update",respo);
      if(respo['success']){
        this.toastr.success(respo['data'],"Success Message");
        this.getUserData();
      }else{
        this.toastr.error(respo['data'],"Error Message")
      }
    });

    
    }else{
      this.toastr.error("All field are required","Error Message")

    }
  }

  

  userDetailsForm() {

    this.userDetails = this.fb.group({
      fullName:[this.mainUserData.userDetailsFullName,Validators.required],
      // categoryId: ['',],
      email_id: [ this.mainUserData.userDetailsEmail, 
      Validators.email
    ],
      mobile: [this.mainUserData.userDetailsMobile, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      
      dob:[this.mainUserData.userDetailsDob,Validators.required],
      password:[this.mainUserData.userDetailsPassword,Validators.required],
      gender:[this.mainUserData.userDetailsGender,Validators.required],

      areaStreet:[this.mainUserData.userDetailsAreaStreet,Validators.required],
      landmark:[this.mainUserData.userDetailsLandmark,Validators.required],
      city:[this.mainUserData.userDetailsCity,Validators.required],
      pinCode:[this.mainUserData.userDetailsPincode,Validators.required],

      state:[this.mainUserData.userDetailsState,Validators.required],
    
    });
  }

  updateProfilePhoto(){
    let reqBody = {};
    reqBody['email'] = this.mainService.userId;
    reqBody['userPhoto'] = this.base64textString;

    if(this.base64textString == "" || this.base64textString.length == 0){
      this.toastr.error("Please set profile photo","Error Message")
    }

    this.mainService.userApiService(this.env.mainUrl+"/updateProfilePhoto",reqBody).then((respo)=>{
      console.log("upload profile photo",respo);
      if(respo['success']){
        this.toastr.success(respo['data'],"Success Message")

      }else{
      this.toastr.error(respo['data'],"Error Message")

      }
    })
  }

}
