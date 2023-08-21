import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search-name',
  templateUrl: './search-name.component.html',
  styleUrls: ['./search-name.component.css']
})
export class SearchNameComponent implements OnInit {
  books: Array<Book> = new Array<Book>();
  dataLoaded = false;
  constructor(
    private bookService: BookService,
    // private router: Route,
    private activatedRoute: ActivatedRoute,

  ) { };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["bookName"]) {
        this.search(params["bookName"])

      }

    })
  }
  search(bookName: string) {
    this.bookService.getBooksByName(bookName).subscribe(response => {
      this.books = response;
      this.dataLoaded = true;
    })
  };

}
