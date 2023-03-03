import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EnvServiceService } from 'src/app/services/env-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    public userMainService:MainServiceService,
    private env:EnvServiceService,
    private _sanitizer : DomSanitizer
  ) { }

  categoriesItems = [];// [1,2,3,4,5,6,7,8]


  ngOnInit() {
    this.getCategoryList();
  }


  getCategoryList(){
    let reqBody={};
    reqBody['adminId'] = "user";
    
    this.userMainService.userApiService(this.env.mainUrl+"/get_category",reqBody).then((respo)=>{
      console.log("respo---->",respo);
      if(respo['success']){
        let mainData = respo['data'];
        
        mainData.map(x=>{
          if(x['image'] !=''){
            //this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
           //  + chartData['data']);
           x['imageBase64'] = x['image'];
            x['image'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x['image'])
          }
          return x
        });
 
        this.categoriesItems = mainData;
 
        console.log("mainData==",mainData);
      }
    })
  }



}
