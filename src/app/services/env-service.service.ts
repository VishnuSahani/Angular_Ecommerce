import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvServiceService {

  constructor() { }

  mainUrl = "http://127.0.0.1:5000";
}
