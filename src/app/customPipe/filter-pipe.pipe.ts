import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure:false
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    return value.filter((x)=>{
      // 
      return (x.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || x.productDetails.toLowerCase().includes(searchTerm.toLowerCase())  || x.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ;//categoryName
    });
  }

}
