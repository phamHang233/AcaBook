import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { RegisterModel } from 'src/app/models/register';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user!: User;
  searchKeyword!: string;
  loading = false;
  userFromApi!: User;

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
    private userService: UserService,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    if (this.authService.userValue != null) {
      this.user = this.authService.userValue;
    }
  }

  isAuthenticated() {
    if (this.authService.userValue != null) {
      return true;
    }
    else {
      return false
    }
  }
  isAdmin() {
    if (this.authService.userValue != null && this.authService.userValue.role == "admin") {
      return true
    }
    else return false
  }


  cart() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/cart"]);
    }
    else {
      this.router.navigate(['/login']);
    }
  }


  logout() {
    this.authService.logout()

  }


}
