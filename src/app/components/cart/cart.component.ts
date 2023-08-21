import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookCart } from 'src/app/models/bookCart';
import { CartService } from 'src/app/services/cart.service';
import { PopupCartComponent } from './popup-cart/popup-cart.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Array<BookCart> = new Array<BookCart>();
  checkBox: boolean[] = []
  totalPay!: number;
  totalSale!: number;
  allChoosed!: boolean;
  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router,
    private toasterService: ToastrService,

  ) {

  }
  ngOnInit(): void {

    this.getCartItems()
    this.getTotalPay();
    this.getTotalSale()

  }
  getCartItems() {
    // Lấy giá trị của khóa 'cartItems' từ Local Storage
    const savedCartItems = localStorage.getItem('cartItems');

    if (savedCartItems) {

      this.cartItems = JSON.parse(savedCartItems);

    } else {
      return;
    }

  }
  addOneItem(product: BookCart) {
    const existingItem = this.cartItems.find(item => item.book._id === product.book._id);
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

  }
  minusOneItem(product: BookCart) {
    const existingItem = this.cartItems.find(item => item.book._id === product.book._id);
    if (existingItem) {
      existingItem.quantity = existingItem.quantity - 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

  }
  removeItem(product: BookCart) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      this.cartService.removeItemFromCart(product);
      this.toasterService.success('Xóa sản phẩm thành công')
    }
  }
  getCartItemCount() {
    this.cartService.getCartItemCount();
  }

  toggleCheckBox(product: BookCart) {
    // product.choosed = !product.choosed;
    // console.log(product.choosed);
    this.getTotalPay();
    this.getTotalSale()
  }
  selectAllCheckBox() {
    if (this.allChoosed) {
      for (let item of this.cartItems) {
        item.choosed = true;
      }
    }
    else {
      for (let item of this.cartItems) {
        item.choosed = false;
      }

    }
    this.getTotalPay();
    this.getTotalSale()
  }
  getTotalSale() {
    this.totalSale = 0;

    for (let item of this.cartItems) {

      if (item.choosed) {


        this.totalSale = this.totalSale + item.quantity * (item.book.dailyPrice - item.book.salePrice);

      }
    }


  }
  getTotalPay() {
    this.totalPay = 0;
    for (let item of this.cartItems) {

      if (item.choosed)
        this.totalPay = this.totalPay + item.quantity * item.book.salePrice;


    }
  }
  check() {
    for (let item of this.cartItems) {
      if (item.choosed) return true;
    }
    return false;
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(PopupCartComponent, {
      width: '200px',

    });
  }
  setCartItems() {
    if (!this.check()) {
      this.openPopup();
      return;

    }

    const saleCartItems: Array<BookCart> = new Array<BookCart>();
    for (let item of this.cartItems) {
      if (item.choosed) {
        saleCartItems.push(item);

      }
    }
    localStorage.setItem("saleCartItems", JSON.stringify(saleCartItems));
    this.router.navigate(["checkout"])
  }


}
