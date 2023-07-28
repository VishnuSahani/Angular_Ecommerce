import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private _sanitizer : DomSanitizer,
    private router : Router,
    private toastr:ToastrService,
    private route:ActivatedRoute


  ) { }

  productList = [];
  productListGlobal = [];
  categoriesType :any = '';
  ngOnInit() {
    // this.getProductList();

  }

  ngAfterViewInit(): void {
    this.getProductList();

    this.route.queryParams.subscribe(param=>{
      this.categoriesType = param['categoryType'];
     

    })
  }


  getProductList(){
    let req = {"adminId":"user"};

    
    if(this.mainService.userLoginStatus){
      req['email'] = this.mainService.userId;
      
    }else{
      req['email'] = "user";

    }

    
    this.mainService.userApiService(this.env.mainUrl+"/get_product",req).then((respo)=>{
      console.log("Product info ",respo);
      if(respo['success']){
        let mainData = respo['data'];


        
        mainData.map(x=>{
          if(x['productImage'] !=''){

           x['buyQty'] = 1;
            
           x['imageBase64'] = x['productImage'];
            x['productImage'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x['productImage'])
          }
          return x
        });

        this.mainService.cartList = mainData.filter((x)=> x['isCart']== true);

        this.mainService.cartNo = this.mainService.cartList.length;
 
        this.productList = mainData;
        this.productListGlobal = [...mainData];
      if(this.categoriesType != '' && this.categoriesType != undefined && this.categoriesType != null){

        this.productList = this.productListGlobal.filter((x)=>{
          if(x['category_id'] == this.categoriesType){
            return x;
          }
        });

        if(this.productList.length == 0){
          this.productList = this.productListGlobal ;
          this.toastr.info("Category item not show")
        }
      }
        
 
        console.log("mainData==",mainData);
      }
      
    })

  }

  addToCart(item){
    console.log("add to cart ",item);

    if(!this.mainService.userLoginStatus){
      this.toastr.info("Please Login","Information");
      this.router.navigate(['index/login']);
    }
    
    let reqBody ={
      "email": this.mainService.userId,
      "productId":item.id,
      "productName":item.productName
    };
    
    let url ='/userAddToCart'

    if(item.isCart){
      url ='/userRemoveCartData'
    }

    this.mainService.userApiService(this.env.mainUrl+url,reqBody).then((respo)=>{
      console.log(" cart respo",respo);
      this.getProductList();
      
    })

  }


  checkOut(item){
    this.mainService.checkoutList = [item];
    this.router.navigate(['/index/checkout']);
  }

  showAllProduct(){
    this.productList = [...this.productListGlobal];
  }

}
