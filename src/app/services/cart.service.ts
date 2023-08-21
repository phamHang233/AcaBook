import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BookCart } from '../models/bookCart';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Array<BookCart> = new Array<BookCart>();

  constructor(
    private router: Router,
  ) { }

  addToCart(product: Book) {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItem = this.cartItems.find(item => item.book._id === product._id);

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
      existingItem.quantity++;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
      const newItem: BookCart = { book: product, choosed: false, quantity: 1 };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeItemFromCart(item: BookCart) {
    const index = this.cartItems.findIndex(cartItem => cartItem.book._id === item.book._id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.onRefresh();
  }
  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }


  //   getCartItems() {
  //     // Trả về danh sách sản phẩm trong giỏ hàng
  //     return this.cartItems;
  //   }

  getCartItemCount() {
    // Trả về số lượng sản phẩm trong giỏ hàng
    return this.cartItems.length;
  }


}
