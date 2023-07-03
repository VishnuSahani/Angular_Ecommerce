import { Component, OnInit } from '@angular/core';
import { AdminMainServiceService } from '../services/admin-main-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private adminMainServices : AdminMainServiceService
  ) { }

  orderDetailList = [
    {"orderId":"IDL001","customerName":"Vishnu Sahani","orderItem":"Shoes","deliveryDate":"25-04-2000","price":"5000","quantity":"1","status":"Received","payment":"Cash"},
    {"orderId":"IDL002","customerName":"Vishnu Sahani","orderItem":"Shoes2","deliveryDate":"25-04-2000","price":"5000","quantity":"5","status":"Received","payment":"Cash"}
  ];

  ngOnInit() {
    this.adminMainServices.boardHeading ="Order Details";

  }

}
