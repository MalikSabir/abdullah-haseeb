import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {AddNewProductComponent} from './add-new-product/add-new-product.component';
import {AccountsComponent} from './accounts/accounts.component';


const routes: Routes = [
  // {
  //   path: '', redirectTo:"dashboard", pathMatch:"full"
  // },
  {
    path: '', component:DashboardComponent,
    children:[
        {
            path: '', component:AddNewProductComponent,
        },
        {
            path: 'accounts', component:AccountsComponent,
        },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
