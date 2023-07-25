import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvServiceService {

  constructor() { }

  mainUrl = "http://127.0.0.1:5000";
  // emailUrl = "https://vishnutest.000webhostapp.com/vishnuTestEmail.php";
  // emailUrl = "http://shreegasketindustries.com/vishnuTestEmail.php";
  emailUrl = "https://balajidisha.shop/vishnuTestEmail.php";
}
