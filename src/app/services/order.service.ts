import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }
  getAllOrder(): Observable<Array<Order>> {
    return this.httpClient.get<Array<Order>>(this.apiUrl + 'order')
  }
  addOrder(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "order/add", data)
  }
  //   getNumberOrder() :Observable<number>{
  //     return this.getAllOrder()
  //     .pipe(
  //       map((response) => response.count) // Thay 'count' bằng thuộc tính chứa số bản ghi từ server
  //     );
  // }
}

