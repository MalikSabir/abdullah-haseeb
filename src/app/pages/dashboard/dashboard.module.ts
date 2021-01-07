import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AccountsComponent } from './accounts/accounts.component';


@NgModule({
  declarations: [DashboardComponent, AddNewProductComponent, AccountsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
