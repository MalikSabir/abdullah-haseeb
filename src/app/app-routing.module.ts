import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from '../app/components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ElmaProductsComponent } from './pages/elma-products/elma-products.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'team',
    component:TeamComponent
  },
  {
    path:'services',
    component:ServicesComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'abdullah-products',
    component:OurProductsComponent
  },
  {
    path:'elma-products',
    component:ElmaProductsComponent
  },
  {
    path:'portfolio',
    component:PortfolioComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
