import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ViewProductsComponent } from './view-products/view-products.component';


const routes: Routes = [
    {
      path:'',component:DashboardComponent
    },
    // view-products
    {
      path:'view-products/:id',component:ViewProductsComponent
    },
    {
      path:'cart',component:AddToCartComponent
    },
    {
      path:'orders',component:RegisterComponent

    },
    {
      path:'admin',component:AdminComponent
    }
    // login
    // {
    //   path:'signin',component:LoginComponent
    // },
     //page-not-found
    // {
    //   path:'**',component:PageNotFoundComponent
    // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
