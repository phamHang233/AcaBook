import { Component, OnInit } from '@angular/core';
import { BookCart } from 'src/app/models/bookCart';
import { MatDialog } from '@angular/material/dialog';
import { FinishedComponent } from './finished/finished.component';
import { Address } from 'src/app/models/address';
import { AddressPopupComponent } from './address-popup/address-popup.component';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  address!: Address;
  cartItems!: Array<BookCart>;
  totalPay = 0;
  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {


  }
  getAddress() {
    const add = localStorage.getItem('address');
    if (add) {

      this.address = JSON.parse(add);
      // this.onRefresh();
    }
    else { }
    // console.log(ad);


  }
  ngOnInit(): void {
    this.getCartItems();
    this.getTotalPay();
    this.getAddress();

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
    const dialogRef = this.dialog.open(FinishedComponent, {
      width: '200px',

    });
    this.onRefresh();

  }
  changeAddress() {
    const dialogRef = this.dialog.open(AddressPopupComponent, {});
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
