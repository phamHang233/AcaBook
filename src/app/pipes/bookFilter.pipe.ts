import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(value: Book[], bookFilter: string): Book[] {
    bookFilter = bookFilter ? bookFilter.toLocaleLowerCase() : ""

    if (bookFilter)
      return value.filter((c: Book) => c.bookName.toLocaleLowerCase().indexOf(bookFilter) !== -1)
    else return value;
  }

}
