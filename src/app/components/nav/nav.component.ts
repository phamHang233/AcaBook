import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.authService.userValue != null) {
      this.user = this.authService.userValue;
      // console.log(this.user)
    }
  }

  isAuthenticated() {
    if (this.authService.userValue != null) {
      return true;
    }
    return false;

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
