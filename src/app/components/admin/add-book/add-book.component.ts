import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookFormCreate!: FormGroup;
  localUrl!: string;
  dataLoaded = false;
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private formBuilder: FormBuilder,

    private router: Router,

    private toasterService: ToastrService,
    private httpClient: HttpClient,

  ) {

  }
  ngOnInit(): void {
    this.createBookForm();
  }

  createBookForm() {
    this.bookFormCreate = this.formBuilder.group({
      bookName: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      salePrice: ["", Validators.required],
      description: [""],
      category: [""],
      imagePath: [""],
      author: ["", Validators.required],



    })
  }
  handleFileInputChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.bookFormCreate.value.imagePath = event.target.result;
      }
      var path = reader.readAsDataURL(event.target.files[0]);
    }

  }
  saveShow() {
    if (this.bookFormCreate.valid) {

      this.bookService.addBook(this.bookFormCreate.value).subscribe(response => {

        if (response.status) {
          this.toasterService.success('Thêm sản phẩm thành công');
          this.router.navigate(['/adminBooks'])
        }
        else
          this.toasterService.error('Thêm sản phẩm thất bại');
      });

    }

  }
  logout() {
    this.authService.logout()

  }
}
