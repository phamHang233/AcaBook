import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Book } from '../models/book';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
// import { DashboardBooks } from '../models/dashboard-books';
// import { BookStandart } from '../models/bookStandart';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.apiUrl + 'allBooks')
  }
  getBooksBestSeller(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.apiUrl + 'bestSellerBooks')
  }
  // getBookDetail(bookId: number) {
  //   let newPath = this.apiUrl + "allBooks?bookId=" + bookId;
  //   return this.httpClient.get<Book>(newPath);
  // }

  getBookById(bookId: number): Observable<any> {
    let newPath = this.apiUrl + "allBooks/" + bookId
    return this.httpClient.get<any>(newPath);
  }

  addBook(book: Book): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "books/add", book)
  }

  // updatebook(book:BookStandart):Observable<ResponseModel>{
  //   return this.httpClient.post<ResponseModel>(this.apiUrl + "books/update", book)
  // }

  // deletbook(book:BookStandart):Observable<ResponseModel>{
  //   return this.httpClient.post<ResponseModel>(this.apiUrl + "books/delete", book)
  // }
  searchBooks(keyword: string): Observable<Array<Book>> {

    return this.httpClient.get<Array<Book>>(this.apiUrl + "allBooks?bookName=" + encodeURIComponent(keyword));
  }

  getBooksByCategory(categoryId: number): Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + "books/getbycategory?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModel<Book>>(newPath)
  }
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
