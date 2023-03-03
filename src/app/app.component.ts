import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //implements OnInit
  title = 'eCom';

  constructor(private router : Router){}

  ngOnInit(): void {
    console.log(this.router.url)

    // this.router.navigate(['index/home'])
    this.router.navigate(['adminPanal'])
  }
}
