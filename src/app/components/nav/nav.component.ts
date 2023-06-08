import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { LocalStorageService } from 'src/app/services/localStorageService.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  // styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user!: RegisterModel;
  userRol = this.authService.role;
  searchKeyword!: string;
  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
    private bookService: BookService,
  ) { }
  getUser() {
    const userstr = localStorage.getItem("user")
    if (userstr) {
      this.user = JSON.parse(userstr);

    }
  }
  ngOnInit(): void {
    this.isAuthenticated()
    // if (this.isAuthenticated()) {
    //   this.authService.userDetailFromToken();
    // }

  }


  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true
    }
    else {
      return false
    }
  }
  checkAdminRole() {
    if (this.authService.role[0] == "admin") {
      return true
    }
    else {
      return false

    }
  }

  checkUserRole() {
    if (this.authService.role == "user") {
      return true
    }
    else {
      return false
    }
  }

  checkNotRole() {
    if (this.authService.role == null) {
      return true
    }
    else {
      return false
    }
  }

  // logout() {
  //   this.authService.logout()
  //   this.toasterService.success("Çıkış Yapıldı", "Başarılı")
  // }


}
