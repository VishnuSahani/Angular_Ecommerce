import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(
    private http:HttpClient
  ) { }

  userTopHeader :boolean = true;

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
}
