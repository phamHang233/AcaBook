import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { ResponseModel } from '../models/response';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.apiUrl + 'allBooks')
  }
  getBooksBestSeller(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.apiUrl + 'bestSellerBooks')
  }
  getBooksByName(search_key: any): Observable<Array<Book>> {
    var url = this.apiUrl + "search/" + search_key
    return this.httpClient.get<Array<Book>>(url)
  }

  getBookById(bookId: string): Observable<Book> {
    let newPath = this.apiUrl + "books/" + bookId
    return this.httpClient.get<Book>(newPath);
  }

  addBook(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "books/add", data)
  }

  updateBook(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + "books/update/" + id, data)
  }

  deleteBook(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + "books/delete/" + id)
  }
  searchBooks(keyword: string): Observable<Array<Book>> {

    return this.httpClient.get<Array<Book>>(this.apiUrl + "allBooks?bookName=" + encodeURIComponent(keyword));
  }

  getAllReview(): Observable<Array<Review>> {
    return this.httpClient.get<Array<Review>>(this.apiUrl + 'review')
  }
  getReviewByBookID(bookID: string): Observable<Array<Review>> {
    return this.httpClient.get<Array<Review>>(this.apiUrl + "review/" + bookID)
  }
  // addOrder(data: any): Observable<any> {
  //   return this.httpClient.post<any>(this.apiUrl + "order/add", data)
  // }

  // getBooksByCategory(categoryId: number): Observable<ListResponseModel<Book>> {
  //   let newPath = this.apiUrl + "books/getbycategory?categoryId=" + categoryId
  //   return this.httpClient.get<ListResponseModel<Book>>(newPath)
  // }
  // getbooksByColor(colorId:number):Observable<ListResponseModel<book>>{
  //   let newPath= this.apiUrl+"books/getbycolor?colorId="+colorId
  //   return this.httpClient.get<ListResponseModel<book>>(newPath)
  // }
  // getbooksBySelect(brandId:number, colorId:number){
  //   let newPath = this.apiUrl + "books/getbyselected?brandId=" + brandId + "&colorId=" + colorId;
  //   return this.httpClient
  //     .get<ListResponseModel<book>>(newPath);
  // }


  // getAllBookDetail(){
  //   let newPath = this.apiUrl + "books/getallbookdetail"
  //   return this.httpClient
  //     .get<ListResponseModel<Dashboardbooks>>(newPath);
  // }
}
