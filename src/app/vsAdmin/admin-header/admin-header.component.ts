import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminMainServiceService } from '../services/admin-main-service.service';
import { MatDialog } from '@angular/material';
import { AdminLogoutComponent } from '../dialog/admin-logout/admin-logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public adminMainService:AdminMainServiceService,
    private dialog : MatDialog,
    private router : Router
    ) {}

    ngOnInit(): void {
      if(!this.adminMainService.loginStatus){
        this.router.navigate(["/index/home"])

      }
    }

  logoutAdmin(){
    this.dialog.open(AdminLogoutComponent,{

    }).afterClosed().subscribe((result)=>{
      if(result){
        this.adminMainService.loginStatus = false;
        this.router.navigate(["/index/home"])

      }
    })

  }

}
