import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainServiceService } from './services/main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //implements OnInit
  title = 'eCom';

  constructor(
    private router : Router,
    public mainService : MainServiceService,
    private route: ActivatedRoute,
    private toastr : ToastrService

    ){}

  ngOnInit(): void {
    console.log(this.router.url)

    // let param1 = this.route.snapshot.paramMap.get('admin');
   setTimeout(() => {
    let param1 = this.route.snapshot.queryParamMap.get("admin");

    console.log("query param test",param1)
    //alert(param1)

//     this.router.navigate(['admin']);
// return;

    if(param1 == 'idealCart'){

    // this.router.navigate(['adminPanal']); // without login
    this.router.navigate(['admin']);

    }else{

      this.router.navigate(['index/home'])
      // this.router.navigate(['admin']); // open for admin test

    this.getLogin();

    }


    


   }, 100);

   
  }

  getLogin(){
  
    let tempObj_Local = localStorage.getItem("ideal_user_data");
    if(tempObj_Local != undefined && tempObj_Local != null){
      let loginData = JSON.parse(window.atob(tempObj_Local));
      console.log("login ",loginData);
      if(loginData['loginTrue']){
        this.mainService.userLoginStatus = true;
        this.mainService.userName = loginData['userName'];
        this.mainService.userId = loginData['userId']
        this.toastr.success("You are successfully login","Success");


      }

      
    }
  }
}
