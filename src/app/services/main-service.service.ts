import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(
    private http:HttpClient
  ) { }

  userTopHeader :boolean = true;
  userLoginStatus:boolean = false;
  userName :any = "";
  userId :any = "";
  cartNo = 0;
  cartList = [];
  checkoutList = [];
  shippingAmount = 40;


  getUserTopHeader(){
    return this.userTopHeader;
  }

  setUserTopHeader(bool){
    this.userTopHeader = bool;
  }


  userApiService(url,requestBody){
   

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve,reject)=>{
        this.http.post(url,requestBody,httpOptions).subscribe((respo)=>{
          resolve(respo);
        },
        (error:any)=>{
          reject(error);
        })
      });
  
    
  }

  userApiMail(url,requestBody){
   

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return new Promise((resolve,reject)=>{
      this.http.post(url,requestBody,httpOptions).subscribe((respo)=>{
        resolve(respo);
      },
      (error:any)=>{
        reject(error);
      })
    });

  
}

  
}
