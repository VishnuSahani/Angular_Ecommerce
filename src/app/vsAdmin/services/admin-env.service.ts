import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminEnvService {

  constructor() { }

  public mainUrl = "http://127.0.0.1:5000";
}
