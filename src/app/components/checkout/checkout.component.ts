import { Component, OnInit } from '@angular/core';
import { BookCart } from 'src/app/models/bookCart';
import { MatDialog } from '@angular/material/dialog';
import { FinishedComponent } from './finished/finished.component';
import { Address } from 'src/app/models/address';
import { AddressPopupComponent } from './address-popup/address-popup.component';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  address!: Address;
  cartItems!: Array<BookCart>;
  totalPay = 0;
  userID!: string;
  dataLoaded = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.authService.userValue != null) {
      this.userID = this.authService.userValue._id;
      console.log(this.userID)
      this.getAddrDetail(this.userID)
      // this.getAddress();

    }
    this.getCartItems();
    this.getTotalPay();

  }

  getAddrDetail(userID: string) {
    this.userService.getAddr(userID).subscribe(
      (response) => {
        this.address = response;

        this.dataLoaded = true;
      },
      (error) => {
        console.error('Error occurred while getting book detail:', error);

      }
    );
  }
  getAddress() {
    const savedAddr = localStorage.getItem("address");
    if (savedAddr) {

      this.address = JSON.parse(savedAddr);
    }
  }



  getCartItems() {
    const savedCartItems = localStorage.getItem("saleCartItems");
    if (savedCartItems) {

      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  getTotalPay() {

    for (let item of this.cartItems) {
      this.totalPay = this.totalPay + item.book.salePrice * item.quantity

    }
  }

  finish(): void {

    const now = new Date();
    this.cartItems.forEach(cartItem => {
      var orderCart = {
        product_id: cartItem.book._id, price: cartItem.book.salePrice * cartItem.quantity,
        product_category_name: cartItem.book.category, customer_id: this.userID, order_purchase_timestamp: now
      }
      console.log(orderCart)
      this.orderService.addOrder(orderCart).subscribe(response => {
        console.log("OK")

      });
      const dialogRef = this.dialog.open(FinishedComponent, {
        width: '200px',

      });
      this.onRefresh();



    });

  }

  changeAddress() {
    const dialogRef = this.dialog.open(AddressPopupComponent, {});
    this.getAddrDetail(this.userID);
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
