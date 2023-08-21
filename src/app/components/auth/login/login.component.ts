import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, of, tap } from 'rxjs';
import { LoginModel } from 'src/app/models/login';
import { RegisterModel } from 'src/app/models/register';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  dataLoaded = false;
  user!: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  login() {

    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe((response: any) => {

        if (response.status) {
          this.user = response.msg;
          this.toasterService.success("Đăng nhập thành công!");
          localStorage.setItem("user", JSON.stringify(this.user));
          this.dataLoaded = true;

          this.authService.onRefresh();
          if (this.user.role == "user") {
            this.router.navigate(['/']);
          }
          else if (this.user.role == "admin") {
            this.router.navigate(['/admin'])
          }
        }
        else {
          this.toasterService.error("Đăng nhập không thành công!");

        }

      },
        error => {

          console.log("Lỗi từ API:", error);
          return of(null);
        })


    }
  }
}
