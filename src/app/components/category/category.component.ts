import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  books: Array<Book> = new Array<Book>()
  dataLoaded = false;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 6,
        nav: true,
        loop: false
      }

    },
    nav: true
  }
  constructor(
    private bookService: BookService,



  ) {

  }
  ngOnInit(): void {
    this.getBooks();

  }
  getBooks() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response;
      this.dataLoaded = true;
    })
    for (var book of this.books) {
      console.log(book);
    }
  }
}
