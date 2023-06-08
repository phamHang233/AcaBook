import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SearchNameComponent } from './components/search-name/search-name.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FinishedComponent } from './components/checkout/finished/finished.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupCartComponent } from './components/cart/popup-cart/popup-cart.component';
import { AddressPopupComponent } from './components/checkout/address-popup/address-popup.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CategoryComponent,
    BookDetailComponent,
    PostComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    SearchNameComponent,
    CartComponent,
    CheckoutComponent,
    FinishedComponent,
    PopupCartComponent,
    AddressPopupComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,

    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
