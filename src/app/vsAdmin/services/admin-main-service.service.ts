import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminMainServiceService {

  constructor(
    private http:HttpClient
  ) { }

  boardHeading :string ='';
  productEditData = null;

  apiService(url,requestBody){

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
