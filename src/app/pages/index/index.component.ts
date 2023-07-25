import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    public mainService:MainServiceService,
    private router: Router
    ) { }

  public href: string = "";

  ngOnInit() {

    this.mainService.setUserTopHeader(true);

    this.href = this.router.url;
        

  }

}
