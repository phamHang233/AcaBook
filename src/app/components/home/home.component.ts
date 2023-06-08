import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { BookImageService } from 'src/app/services/bookImage.service';

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
    private bookImageService: BookImageService) { }
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

  // getBooks() {
  //   this.bookService.getBooks().subscribe(response => {
  //     this.books = response;
  //     this.dataLoaded = true;
  //   })
  //   for (var book of this.books) {
  //     console.log(book);
  //   }
  // }
  //Get the button


  // constructor() {
  //   // let mybutton = localStorage['getElementById']("myBtn-scroll");
  // }
  // ngOnInit(): void {
  //   setTimeout(function () {
  //     location.reload();
  //   }, 60 * 1000);
  // }
}

    // When the user scrolls down 20px from the top of the document, show the button
  //   window.onscroll = function () {
  //     if (mybutton != null) {
  //       if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //         this.mybutton.style.display = "block";
  //       } else {
  //         this.mybutton.style.display = "none";
  //       }
  //     }
  //   };

  // }

  // // When the user clicks on the button, scroll to the top of the document
  // topFunction() {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // }



