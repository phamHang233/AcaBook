import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookImage } from 'src/app/models/bookImage';
import { BookService } from 'src/app/services/book.service';
import { BookImageService } from 'src/app/services/bookImage.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {

  book!: Book;
  bookImages: BookImage[] = [];
  currentImage!: BookImage;
  dataLoaded = false;
  imageUrl = "http://localhost:3000/"

  constructor(private bookService: BookService,
    private bookImageService: BookImageService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["bookId"]) {
        this.getBookDetail(params["bookId"])
      }

    })
  }

  getBookDetail(bookId: number): void {
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
    this.cartService.addToCart(this.book);

  }

  getImagesByBookId() {

    //   this.bookImageService.getBookImages(this.activatedRoute.snapshot.params["bookId"]).subscribe((response) => {
    //     this.bookImages = response.data;
    //   });
  }

  getCurrentImageClass(image: BookImage) {
    //   if(image==this.bookImages[0]){
    //     return "bookousel-item active"
    //   } else {
    //     return "bookousel-item"
    //   }
  }

  getButtonClass(image: BookImage) {
    //   if(image==this.bookImages[0]){
    //     return "active"
    //   } else {
    //     return ""
    //   }
  }
}
