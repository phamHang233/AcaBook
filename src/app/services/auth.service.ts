import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginModel } from '../models/loginModel';

import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { PasswordChangeModel } from '../models/changePasswordModel';
import { LocalStorageService } from './localStorageService.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;

  apiUrl = "http://localhost:3000/";
  name: string = "";
  surname: string = "";
  userName: string = "";
  role: any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId!: number;
  email!: string;
  password!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private localStorage: LocalStorageService,
    private toasterService: ToastrService

  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  login(loginModel: LoginModel) {
    // return this.httpClient.post<User>(this.apiUrl + "login", loginModel)
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('user', JSON.stringify(user));
    //     this.userSubject.next(user);
    //     return user;
    //   }));
    // return this.httpClient.post(this.apiUrl + "login", loginModel)

    return this.httpClient.get<Array<RegisterModel>>(this.apiUrl + 'register?email=' + loginModel.email);
    // x.subscribe(response => {
    //   this.password = response.password;
    // });
  }

  // register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
  //   return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  // }
  register(registerModel: RegisterModel) {
    return this.httpClient.post(this.apiUrl + "register", registerModel)
  }
  logout() {

    this.localStorage.clear()
    this.onRefresh();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    if (this.localStorage.getItem("user")) {
      return true;
    }
    else {
      return false
    }
  }

  userDetailFromToken() {
    this.token = this.localStorage.getItem("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    let surname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.surname = surname.split(' ')[1];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.email = decodedToken["email"];
    this.userName = name.split(' ')[0] + " " + surname.split(' ')[1];

  }

  roleCheck(roleList: string[]) {
    if (this.roles !== null) {
      roleList.forEach(role => {
        if (this.roles.includes(role)) {
          return true;
        } else {
          return false;
        }
      })
      return true;
    } else {
      return false;
    }
  }
  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }


  changePassword(passwordChangeModel: PasswordChangeModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + "changepassword"
    return this.httpClient
      .post<ResponseModel>(newPath, passwordChangeModel)
  }

  getCurrentUserId(): number {
    return this.userId
  }

}
