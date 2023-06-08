import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.css']
})
export class PopupCartComponent {
  constructor(
    private dialogRef: MatDialogRef<PopupCartComponent>,
    // private router: Router,
  ) { }
  closePopup(): void {
    this.dialogRef.close();
    // this.router.navigate(['/']);
  }
}
