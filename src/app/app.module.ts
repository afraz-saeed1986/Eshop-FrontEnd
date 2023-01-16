import { ProductsService } from './services/Products.service';
import { EshopInterceptor } from './utilities/EshopInterceptor';
import { SliderService } from './services/slider.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './shared-components/site-header/site-header.component';
import { SiteFooterComponent } from './shared-components/site-footer/site-footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { SpecialProductsComponent } from './pages/home/special-products/special-products.component';
import { NewProductsComponent } from './pages/home/new-products/new-products.component';
import { FavoriteProductsComponent } from './pages/home/favorite-products/favorite-products.component';
import { LatestNewsComponent } from './pages/home/latest-news/latest-news.component';
import { BrandsComponent } from './pages/home/brands/brands.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedAccountComponent } from './pages/activated-account/activated-account.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './shared-components/single-product/single-product.component';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    HomeComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LatestNewsComponent,
    BrandsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    ActivatedAccountComponent,
    ProductsComponent,
    SingleProductComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  providers: [
    SliderService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EshopInterceptor,
      multi: true
    },
    AuthService,
    ProductsService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
