import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Review } from 'src/app/models/review';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {

  book!: Book;
  reviews!: Array<Review>;
  // bookImages: BookImage[] = [];
  // currentImage!: BookImage;
  dataLoaded = false;
  imageUrl = "http://localhost:3000/"

  constructor(private bookService: BookService,
    // private bookImageService: BookImageService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToastrService,
    private cartService: CartService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["bookId"]) {
        this.getBookDetail(params["bookId"])
        this.getReview(params["bookId"])
      }

    })
  }
  getReview(bookID: string) {
    this.bookService.getReviewByBookID(bookID).subscribe(
      (response) => {
        this.reviews = response;
        console.log(this.reviews)

      },
      (error) => {
        console.error('Error occurred while getting book detail:', error);

      }
    );
  }

  getBookDetail(bookId: string): void {
    this.bookService.getBookById(bookId).subscribe({
      next: (response: Book) => {
        this.book = response;
        this.dataLoaded = true;
      },
      error: (error: any) => {
        console.error('Error occurred while getting book detail:', error);
      }
    });
  }
  getStars(rating: number | undefined): number[] {
    const fullStars = Math.floor(rating || 0);
    const halfStar = (rating || 0) % 1 >= 0.5 ? 1 : 0;
    const totalStars = fullStars + halfStar;

    return Array(totalStars).fill(0);
  }


  hasHalfStar(rating: number | undefined): boolean {
    console.log((rating || 0) % 1 >= 0.5)
    return (rating || 0) % 1 >= 0.5;

  }

  addToCart() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
    }

    else {
      this.cartService.addToCart(this.book);
      this.toasterService.success("Đã thêm vào giỏ hàng!");

    }

  }

  getImagesByBookId() {

    //   this.bookImageService.getBookImages(this.activatedRoute.snapshot.params["bookId"]).subscribe((response) => {
    //     this.bookImages = response.data;
    //   });
  }

  // getCurrentImageClass(image: BookImage) {
  //   if(image==this.bookImages[0]){
  //     return "bookousel-item active"
  //   } else {
  //     return "bookousel-item"
  //   }
  // }

  // getButtonClass(image: BookImage) {
  //   if(image==this.bookImages[0]){
  //     return "active"
  //   } else {
  //     return ""
  //   }
  // }
}
