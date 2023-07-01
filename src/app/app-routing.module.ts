import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AdminCategoryComponent } from './vsAdmin/admin-category/admin-category.component';
import { AdminDashboardComponent } from './vsAdmin/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './vsAdmin/admin-header/admin-header.component';
import { AdminLoginComponent } from './vsAdmin/admin-login/admin-login.component';
import { AdminProductComponent } from './vsAdmin/admin-product/admin-product.component';
import { AdminAddProductComponent } from './vsAdmin/dialog/admin-add-product/admin-add-product.component';
import { UserDetailsComponent } from './vsAdmin/user-details/user-details.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { RecentProductComponent } from './pages/recent-product/recent-product.component';


const routes: Routes = [
  {path:"",component:IndexComponent},
  // {path:"/",component:IndexComponent},

  {
    path:"index" , component: IndexComponent,
    // runGuardsAndResolvers:'always',
    children:[
      {path:"",redirectTo:'index',pathMatch:'full'},
      {path:"login",component:LoginComponent},
      {path:"home",component:HomeComponent},
      {path:"signUp",component:SignUpComponent},
      {path:"cart",component:CartPageComponent},
      {path:"checkout", component:CheckoutPageComponent},
      {path:"myOrder", component:MyOrderComponent},
      {path:"shop", component:RecentProductComponent},

    ]
  },

  {
     path:"admin" , component: AdminLoginComponent,
  },

  {
    path:"adminPanal" , component: AdminHeaderComponent,
    // runGuardsAndResolvers:'always',
    children:[
      // {path:"",redirectTo:'adminPanal',pathMatch:'full'},
      {path : "", component : AdminDashboardComponent},
      // {path : "dashboard", component : AdminDashboardComponent},
      {path : "category", component : AdminCategoryComponent},
      {path : "product", component : AdminProductComponent},
      {path : "addProduct", component : AdminAddProductComponent},
      {path : "userDetails", component : UserDetailsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
