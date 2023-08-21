import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDetail } from '../models/bookDetail';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  apiUrl = "https://localhost:44388/api/";
  constructor(private httpClient: HttpClient) { }

  // getBookDetail(bookId: number): Observable<ListResponseModel<BookDetail>> {
  //   let newPath = this.apiUrl + "books/getbookdetail?bookId=" + bookId
  //   return this.httpClient.get<ListResponseModel<BookDetail>>(newPath)
  // }
}
