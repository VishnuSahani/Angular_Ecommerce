import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,

  ) { }

  ngOnInit() {
    console.log(this.data)
  }

}
