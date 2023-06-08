import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookImage } from '../models/bookImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {

  apiUrl = 'https://localhost:4200/api/';

  constructor(private httpClient: HttpClient) { }

  getBookImages(bookId: number) {
    return this.httpClient.get<BookImage>(this.apiUrl + 'bookImages/getimagesbybookid?bookId=' + bookId)
  }

  deleteImages(bookImage: BookImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'bookImages/delete', bookImage
    );
  }
}
