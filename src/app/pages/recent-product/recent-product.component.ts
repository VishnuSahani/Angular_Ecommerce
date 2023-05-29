import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-recent-product',
  templateUrl: './recent-product.component.html',
  styleUrls: ['./recent-product.component.css']
})
export class RecentProductComponent implements OnInit, AfterViewInit {

  constructor(
    private env:EnvServiceService,
    private mainService: MainServiceService,
    private _sanitizer : DomSanitizer

  ) { }

  recentsProducts = [1,2,3,4,5,6,7,8];
  productList = [];

  ngOnInit() {
    //this.getProductList();

  }

  ngAfterViewInit(): void {
    this.getProductList();
  }


  getProductList(){
    let req = {"adminId":"user"};
    
    this.mainService.userApiService(this.env.mainUrl+"/get_product",req).then((respo)=>{
      console.log("Product info ",respo);
      if(respo['success']){
        let mainData = respo['data'];

        /*/ {
    "id": 4,
    "category_id": "19",
    "productName": "Ashish vishwakarma",
    "productDetails": "He is a developer TL",
    "productPrice": "1000",
    "productQuantity": "100",
    "productDiscountType": "Percentage",
    "productDiscount": "2",
    "productRating": "5",
    "productIsDescription": "False",
    "productDescription": "",
    "productCreatedDate": "21-02-2023 14:48:25",
    "productUpdatedDate": "27-02-2023 18:15:46",
    "productStatus": 1,
    "productImage":""

    }*/
        
        mainData.map(x=>{
          if(x['productImage'] !=''){
            
          x['isCart']=false,
           x['imageBase64'] = x['productImage'];
            x['productImage'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x['productImage'])
          }
          return x
        });
 
        this.productList = mainData;
 
        console.log("mainData==",mainData);
      }
      
    })

  }

  addToCart(item){



  }

}
