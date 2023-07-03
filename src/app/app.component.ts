import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private mainService : MainServiceService
    ){}

  ngOnInit(): void {
    console.log(this.router.url)

    // this.router.navigate(['index/home'])
    this.router.navigate(['adminPanal']);
    // this.getLogin();
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

      }

      
    }
  }
}
