import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, of, tap } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  dataLoaded = false;
  user!: RegisterModel;
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
      const { email, password } = this.loginForm.getRawValue();
      const loginModel: LoginModel = { email, password };
      // console.log(loginModel.email)
      // const register = localStorage.getItem("user")
      // if (register) {
      //   const registerModel: RegisterModel = JSON.parse(register);
      //   if (email == registerModel.email && password == registerModel.password) {
      //     this.router.navigate(["/"]);
      //   }
      // }


      this.authService.login(loginModel).subscribe(response => {
        this.user = response[0];
        if (this.user && this.user.password && this.user.password === loginModel.password) {
          console.log("Đăng nhập thành công");
          this.toasterService.success("Thành công!");
          localStorage.setItem("user", JSON.stringify(this.user));
          this.dataLoaded = true;
          this.authService.onRefresh();
          this.router.navigate(['/']);
        } else {
          console.log(response[0].password, this.user.password);
          this.toasterService.error("Lỗi!");
        }
      });


      // .pipe(first())
      // .subscribe({
      //   next: () => {
      //     // get return url from query parameters or default to home page
      //     this.toasterService.success("Thành công!")
      //     localStorage.setItem("user", JSON.stringify(loginModel));
      //     this.dataLoaded = true;
      //     this.authService.onRefresh();
      //     this.router.navigate(['/']);
      //     console.log(loginModel.email);
      //   },
      //   error: error => {
      //     console.log("Request thất bại với lỗi:", error);
      //     if (error.error.ValidationErrors && error.error.ValidationErrors.length > 0) {
      //       this.toasterService.error(error.error, "Lỗi!")
      //     }
      //     return of(null)
      //   }
      // });
    }

    //   this.authService.login(loginModel).pipe(
    //     tap(response => {
    //       // console.log("thành công")
    //       this.toasterService.success("Thành công!")
    //       localStorage.setItem("user", JSON.stringify(loginModel));
    //       this.dataLoaded = true;
    //       this.authService.onRefresh();
    //       this.router.navigate(['/']);
    //       console.log(loginModel.email);

    //     }),
    //     catchError(error => {
    //       console.log("Request thất bại với lỗi:", error);
    //       if (error.error.ValidationErrors && error.error.ValidationErrors.length > 0) {
    //         this.toasterService.error(error.error, "Lỗi!")
    //       }
    //       return of(null)
    //     })
    //   ).subscribe();
    // }






    // else {
    //   this.toasterService.error("Vui lòng điền hết thông tin", "Lưu ý!")
    // }



  }
}
