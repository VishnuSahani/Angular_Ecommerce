import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(
    private mainService : MainServiceService
  ) { }


  cartItemList = [];
  shippingAmount = 40;
  subTotalAmount = 0;
  totalAmount = 0;

  ngOnInit() {
    this.cartItemList = this.mainService.cartList;

    this.calculateAmount();
  }

  changeQty(singleItem,operator){

    if(operator){
      singleItem.buyQty = singleItem.buyQty + 1;
    }else{
      singleItem.buyQty = singleItem.buyQty - 1;

    }

    this.calculateAmount();
  }


  removeProduct(item){
    this.cartItemList = this.cartItemList.filter((x)=> x['id'] != item['id']);
    this.calculateAmount();
  }

  calculateAmount(){
    let tot = this.cartItemList.map((x)=>{
      // let val = 0;
      return x['buyQty'] * parseInt(x['productPrice']);
    })
    this.subTotalAmount = tot.reduce((acc, cur) => acc + Number(cur), 0);
    this.totalAmount = this.shippingAmount + this.subTotalAmount;
  }

}
