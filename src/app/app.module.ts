import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SearchNameComponent } from './components/search-name/search-name.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FinishedComponent } from './components/checkout/finished/finished.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupCartComponent } from './components/cart/popup-cart/popup-cart.component';
import { AddressPopupComponent } from './components/checkout/address-popup/address-popup.component';
import { ErrorInterceptor } from './components/auth/_helpers/error.interceptor';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { HomeBookComponent } from './components/admin/home-book/home-book.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { EditBookComponent } from './components/admin/edit-book/edit-book.component';
import { StatisticComponent } from './components/admin/statistic/statistic.component';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/admin/line-chart/line-chart.component';
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
    CartComponent,
    SidebarComponent,
    HomeAdminComponent,
    HomeBookComponent,
    AddBookComponent,
    EditBookComponent,
    StatisticComponent,
    LineChartComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgChartsModule,
    ToastrModule.forRoot({
      toastClass: "ngx-toastr",
      titleClass: "toast-title",
      messageClass: "toast-message",
      positionClass: "toast-bottom-right",

    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    // NgMultiSelectDropDownModule.forRoot(),


  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
