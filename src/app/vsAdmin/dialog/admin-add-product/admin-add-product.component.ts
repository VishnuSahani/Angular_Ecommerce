import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminEnvService } from '../../services/admin-env.service';
import { AdminMainServiceService } from '../../services/admin-main-service.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public adminMainServices: AdminMainServiceService,
    private adminEnv:AdminEnvService,
    private _sanitizer:DomSanitizer,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  categoryList: any = [];
  productForm: FormGroup;
  discountTypeList: any = ["Percentage", "Absolute"];
  editFormData:any;
  isedit:any= false;

  ngOnInit() {
    this.adminMainServices.boardHeading = "Add Product";

    this.getCategeoryList().then((respo)=>{


      this.route.queryParams.subscribe(param=>{
        this.isedit = param['isEdit'];
        if(this.isedit){
           this.editFormData = this.adminMainServices.productEditData;
        this.modifyForm()
        }else{
          this.isedit = false;
        }

      })

    });

    this.newForm();





  }

  modifyForm() {
    this.productForm = this.fb.group({
      categoryId:[this.editFormData.category_id,Validators.required,],
      // categoryId: ['',],
      productName: [this.editFormData.productName, Validators.required],
      productDetails: [this.editFormData.productDetails],
      price: [this.editFormData.productPrice, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]],
      quantity: [this.editFormData.productQuantity, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]],
      discountType: [this.editFormData.productDiscountType],
      discount: [this.editFormData.productDiscount, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]],
      rating: [this.editFormData.productRating, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(8),

      ]],

      isDescription: [this.editFormData.productIsDescription=='False' ?false:true],
      description: [this.editFormData.productDescription],

    });
  }

  newForm() {
    this.productForm = this.fb.group({
      categoryId:['',Validators.required],
      // categoryId: ['',],
      productName: ['', Validators.required],
      productDetails: [""],
      price: [1, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ]],
      quantity: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]],
      discountType: ['Percentage'],
      discount: [0, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]],
      rating: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(8),

      ]],

      isDescription: [false],
      description: [''],

    });
  }

  nullProductName(value) {
    switch (value) {
      case "productName":
        this.productForm.patchValue({ productName: "" });
        break;
      case "productDetails":
        this.productForm.patchValue({ productDetails: "" });
        break;
      case "price":
        this.productForm.patchValue({ price: "" });
        break;
      case "quantity":
        this.productForm.patchValue({ quantity: "" });
        break;
      case "discount":
        this.productForm.patchValue({ discount: "" });
        break;
      case "rating":
        this.productForm.patchValue({ discount: "" });
        break;

    }
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file && (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {

      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);


    } else {
      alert("Please select only png, jpg, jpeg formate image only")
    }


  }

  base64textString:String="";
  imageShow:any;
  showErrorMsg:any='';


  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
    this.imageShow = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64textString)

  }

  productFormSubmit() {
    // console.log("Form submit", this.productForm.value);
    let reqBody = this.productForm.value;
    this.showErrorMsg='';

    let categoryId = reqBody['categoryId'];
    let productName = reqBody['productName'];
    let productDetails = reqBody['productDetails'];
    let price = reqBody['price'];
    let quantity = reqBody['quantity'];
    let discountType = reqBody['discountType'];
    let discount = reqBody['discount'];
    let rating = reqBody['rating'];
    let isDescription = reqBody['isDescription'];
    let description = reqBody['description'];


    if(categoryId.length ==0 || categoryId == undefined || categoryId == null){
      this.showErrorMsg ="Please Select Category Name";
      return;
    }

    if(productName.length ==0 || productName == undefined || productName == null){
      this.showErrorMsg ="Product Name is required";
      return;
    }

    if(productDetails.length ==0 || productDetails == undefined || productDetails == null){
      this.showErrorMsg ="Product Detail is required";
      return;
    }

    if(price.length ==0 || price == undefined || price == null || price < 1){
      this.showErrorMsg ="Product price is required and not less than 1";
      return;
    }

    if(quantity.length ==0 || quantity == undefined || quantity == null || quantity < 1){
      this.showErrorMsg ="Product quantity is required and not less than 1";
      return;
    }

    if(discount.length ==0 || discount == undefined || discount == null){
      this.showErrorMsg ="Please enter either discount value or 0";
      return;
    }

    if(rating.length ==0 || rating == undefined || rating == null){
      this.showErrorMsg ="Please enter rating value of product in numaric value (1 to 5)";
      return;
    }

    if(isDescription){
      if(description.length ==0 || description == undefined || description == null){
        this.showErrorMsg ="If Is Description check than you must add product description";
        return;
      }
    }






    if(this.showErrorMsg.length==0){

      let data;
      let apiUrl;

      if(this.isedit){

        apiUrl = this.adminEnv.mainUrl+"/update_product";

        data={
          "categoryId": categoryId,
          "productName": productName,
          "productDetails": productDetails,
          "price": price,
          "quantity": quantity,
          "discountType": discountType,
          "discount": discount,
          "rating": rating,
          "isDescription": isDescription,
          "description":description,
          "productId":this.editFormData.id
        };

      }else{

        let productImg_base64 = this.base64textString;


        if(productImg_base64.length ==0 || productImg_base64 == undefined || productImg_base64 == null || productImg_base64 ==''){
          this.showErrorMsg ="Please Select Image";
          return;
        }

        data={
          "categoryId": categoryId,
          "productName": productName,
          "productDetails": productDetails,
          "price": price,
          "quantity": quantity,
          "discountType": discountType,
          "discount": discount,
          "rating": rating,
          "isDescription": isDescription,
          "description":description,
          "productImg_base64":productImg_base64
        };



        apiUrl = this.adminEnv.mainUrl+"/add_product";


      }





      console.log("product add body",data);

      this.adminMainServices.apiService(apiUrl,data).then((respo)=>{

        console.log("add product respo==>",respo);
        // this.newForm();
        this.router.navigate(['adminPanal/product'])

      })

    }








  }


  getCategeoryList(){
    let reqBody = {"adminId":"hum"};

    return new Promise((resolve,reject)=>{

      this.adminMainServices.apiService(this.adminEnv.mainUrl+"/get_category",reqBody).then((respo)=>{
        console.log("Category Details==",respo);
        if(respo['success']){
          this.categoryList = respo['data'];
          resolve("done")
        }
      }).catch((err)=>{
        reject("done")
      });
    })



  }
}
