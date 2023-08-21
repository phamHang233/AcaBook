import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home-book',
  templateUrl: './home-book.component.html',
  styleUrls: ['./home-book.component.css']
})
export class HomeBookComponent implements OnInit {
  allBooks!: Array<Book>;
  dataLoaded = false;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
  })
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private toasterService: ToastrService,

  ) {

  }
  ngOnInit() {
    this.getBooks();

  }
  logout() {
    this.authService.logout()

  }
  getBooks() {
    this.bookService.getBooks().subscribe(response => {
      this.allBooks = response;
      this.dataLoaded = true;
    })
  };
  onDelete(bookID: string) {
    if (confirm("Bạn muốn xóa dữ liệu?")) {
      this.bookService.deleteBook(bookID).subscribe(response => {
        this.toasterService.success('Xóa sản phẩm thành công')
        this.getBooks();
      }, error => {
        console.log(error)
      })

    }
  }
  onSearch() {
    this.bookService.getBooksByName(this.searchForm.value.name).subscribe(response => {
      this.allBooks = response;
    })
  }
}
