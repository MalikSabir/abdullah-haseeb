import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import { ContactComponent } from './components/contact/contact.component';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { OurProductsComponent } from './pages/our-products/our-products.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ServiceProductsComponent } from './components/service-products/service-products.component';
import { ElmaProductsComponent } from './pages/elma-products/elma-products.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { ApiServicesService } from './api-services/api-services.service';
import { AuthInterceptor } from './auth/login/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    ContactComponent,
    LeadershipComponent,
    OurProductsComponent,
    PortfolioComponent,
    ServiceProductsComponent,
    ElmaProductsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiServicesService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
