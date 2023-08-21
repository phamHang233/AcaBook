import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book!: Book;
  // bookImages: BookImage[] = [];
  // currentImage!: BookImage;
  dataLoaded = false;
  imageUrl = "http://localhost:3000/"
  bookFormEdit!: FormGroup;
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["bookId"]) {
        this.getBookDetail(params["bookId"])
      }

    })

  }

  createLoginForm() {
    this.bookFormEdit = new FormGroup({
      bookName: new FormControl(`${this.book.bookName}`),
      author: new FormControl(`${this.book.author}`),
      dailyPrice: new FormControl(`${this.book.dailyPrice}`),
      salePrice: new FormControl(`${this.book.salePrice}`),
      description: new FormControl(`${this.book.description}`),
      category: new FormControl(`${this.book.category}`),
      imagePath: new FormControl(`${this.book.imagePath}`)
    });

  }

  getBookDetail(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(
      (response) => {
        this.book = response;
        this.dataLoaded = true;
        this.createLoginForm();
      },
      (error) => {
        console.error('Error occurred while getting book detail:', error);
      }
    );
  }

  update() {
    console.log(this.bookFormEdit.value)
    this.bookService.updateBook(this.book._id, this.bookFormEdit.value).subscribe(
      response => {
        this.toasterService.success('Cập nhật thành công')
        // console.log(this.book)
        this.router.navigate(['/adminBooks'])
      },
      error => {
        console.log("error: ", error)
      }
    )

  }


  logout() {
    this.authService.logout()

  }
}
