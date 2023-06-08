import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterModel } from 'src/app/models/registerModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  dataLoaded = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    // private registerModel: RegisterModel;
    private router: Router
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {

    this.createLoginForm();

  }
  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  register() {

    // console.log("register")
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.getRawValue();
      const registerModel: RegisterModel = { firstName, lastName, email, password, id: -1 };
      this.authService.register(registerModel).pipe(
        tap(response => {
          // console.log("thành công")
          this.toasterService.success("Thành công!")
          // localStorage.setItem("user", JSON.stringify(registerModel))
          this.dataLoaded = true;
          this.router.navigate(['/']);
        }),
        catchError(error => {
          console.log("Request thất bại với lỗi:", error);
          // console.log("ERROR")
          if (error.error.ValidationErrors && error.error.ValidationErrors.length > 0) {

            this.toasterService.error(error.error, "Lỗi!")
          }
          return of(null)
        })
      ).subscribe();
      //     this.authService.register(registerModel).subscribe(response => {
      //       this.toasterService.success(response.message, "Thành công!")
      //       this.dataLoaded = true

      //     }
      //       , responseError => {
      //         console.log("Request thất bại với lỗi:", responseError);
      //         if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length > 0) {

      //           this.toasterService.error(responseError.error, "Lỗi!")
      //         }

      //       })


    }
    else {
      console.log("thiếu thông tin")
      this.toasterService.error("THIẾU THÔNG TIN", "Lưu ý!")

    }

  }
}

