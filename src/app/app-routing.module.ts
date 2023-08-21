import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SearchNameComponent } from './components/search-name/search-name.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './components/auth/_helpers/login.guard';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { HomeBookComponent } from './components/admin/home-book/home-book.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { EditBookComponent } from './components/admin/edit-book/edit-book.component';
import { LineChartComponent } from './components/admin/line-chart/line-chart.component';
// import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "category", component: CategoryComponent },
  { path: "post", component: PostComponent },
  { path: "contact", component: ContactComponent },
  // { path: "product", component: ProductComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "book/details/:bookId", component: BookDetailComponent },
  { path: "search/:bookName", component: SearchNameComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "admin", component: HomeAdminComponent },
  { path: "adminBooks", component: HomeBookComponent },
  { path: "addBook", component: AddBookComponent },
  { path: "editBook/:bookId", component: EditBookComponent },
  { path: "chart", component: LineChartComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
