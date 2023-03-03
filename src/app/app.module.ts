import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { IndexComponent } from './pages/index/index.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FeaturedProductComponent } from './vsAdmin/featured-product/featured-product.component';
import { RecentProductComponent } from './pages/recent-product/recent-product.component';
import { OwlCarouselComponent } from './pages/owl-carousel/owl-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterComponent } from './pages/footer/footer.component';
import { AdminLoginComponent } from './vsAdmin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './vsAdmin/admin-dashboard/admin-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminHeaderComponent } from './vsAdmin/admin-header/admin-header.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminCategoryComponent } from './vsAdmin/admin-category/admin-category.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminAddCategoryComponent } from './vsAdmin/dialog/admin-add-category/admin-add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './vsAdmin/confirm-dialog/confirm-dialog.component';
import { AdminProductComponent } from './vsAdmin/admin-product/admin-product.component';
import { AdminAddProductComponent } from './vsAdmin/dialog/admin-add-product/admin-add-product.component';
import { CommonProductComponent } from './common/common-product/common-product.component';
// import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    CategoriesComponent,
    FeaturedProductComponent,
    RecentProductComponent,
    OwlCarouselComponent,
    FooterComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    LoginComponent,
    HomeComponent,
    AdminCategoryComponent,
    AdminAddCategoryComponent,
    ConfirmDialogComponent,
    AdminProductComponent,
    AdminAddProductComponent,
    CommonProductComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    CarouselModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    // DragDropModule
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [],
  entryComponents:[AdminAddCategoryComponent,ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
