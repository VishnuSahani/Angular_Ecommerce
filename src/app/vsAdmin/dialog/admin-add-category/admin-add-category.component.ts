import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AdminEnvService } from '../../services/admin-env.service';
import { AdminMainServiceService } from '../../services/admin-main-service.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private adminMainService : AdminMainServiceService,
    private adminEnv : AdminEnvService,
    private _sanitizer: DomSanitizer,
    private toastrService:ToastrService
  ) { }

  categoryName:any
  base64textString:String="";
  imageShow:any;
  // respoMessage:any = "";

  ngOnInit() {
    console.log(this.data)
    if(!this.data['isNew']){
      // alert("old");
      let mainData = this.data['mainData'][0];

      this.categoryName = mainData['category_name'];
      this.base64textString =  mainData['imageBase64'];
      this.imageShow = mainData['image'];

    }
  }


  addCategory(){
    console.log(this.categoryName);

    let reqBody ={};
    reqBody['categoryName'] = this.categoryName.toUpperCase();
    reqBody['categoryImage'] = this.base64textString;

    if(this.data['mainData'] != undefined){
      reqBody['imageName'] = this.data['mainData'][0]['image_name'];
    }

    console.log(reqBody);
    let url = this.adminEnv.mainUrl+"/add_category";
    if(!this.data['isNew']){
          url = this.adminEnv.mainUrl+"/update_category";
          reqBody['categoryId'] = this.data['mainData'][0]['id'];

    }

    this.adminMainService.apiService(url,reqBody).then((respo)=>{
      console.log("add_category = ",respo);

      if(respo['success']){
        this.imageShow = null;
        this.categoryName = null;

        this.toastrService.success(respo['data'],"Success Message")

      }else{
        this.toastrService.error(respo['data'],"Error Message")

      }
    })


  }


  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if(files && file && (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type =='image/webp')){

        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);


    }else{
      alert("Please select only png, jpg, jpeg formate image only")
    }


}



_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(btoa(binaryString));
          this.imageShow = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ this.base64textString)

  }

}
