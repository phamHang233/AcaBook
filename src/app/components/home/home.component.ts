import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      400: {
        items: 3
      },
      600: {
        items: 4
      },
      800: {
        items: 5
      }
    },
    nav: true
  }
  currentPage!: number;
  booksBestSeller: Array<Book> = new Array<Book>();
  dataLoaded = false;
  constructor(
    private bookService: BookService,
  ) { }
  ngOnInit(): void {
    this.getBooksBestSeller();
    this.currentPage = 1;
  }
  getBooksBestSeller() {
    this.bookService.getBooksBestSeller().subscribe(response => {
      this.booksBestSeller = response;
      this.dataLoaded = true;
    })
  };
  showPage1() {
    this.currentPage = 1;
  }
  showPage2() {
    this.currentPage = 2;
  }
  showPage3() {
    this.currentPage = 3;
  }
}


