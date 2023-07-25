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
  
  ngOnInit() {
    this.eventSubject.asObservable();

    this.eventSubject.subscribe((val)=>{
      console.log("First",val);
      this.result = val;
    });
  }

  adminLogin(){
    //alert("Hello")
    this.router.navigate(["/adminPanal"])
  }

  emitEvent() {
    this.count = this.count + 1;
    this.eventSubject.next(this.count);
    // this.eventSubject.subscribe((val)=>{
    //   this.result = val;
    // })
  }

}
