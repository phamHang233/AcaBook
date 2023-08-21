import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ResponseModel } from '../models/response';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:8000/";

  // constructor(
  //   private httpClient: HttpClient
  // ) { }

  // // getbyid(userId: number): Observable<SingleResponseModel<User>> {
  // //   let newPath = this.apiUrl + "users/getbyıd?userId=" + userId
  // //   return this.httpClient.get<SingleResponseModel<User>>(newPath)
  // // }

  // updateInfos(user: User): Observable<ResponseModel> {
  //   let newPath = this.apiUrl + "users/updated"
  //   return this.httpClient.put<ResponseModel>(newPath, user)
  // }
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
  registerAddr(data: any): Observable<any> {

    return this.http.post<any>(this.apiUrl + 'addr/createAddr', data)
  }
  changeAddr(userID: string, data: any): Observable<any> {

    return this.http.put<any>(this.apiUrl + 'addr/update/' + userID, data)
  }
  getAddr(userID: string): Observable<Address> {
    return this.http.get<Address>(this.apiUrl + "addr/getAddr/" + userID)
  }
}
