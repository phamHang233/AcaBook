import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent {
  constructor(
    private dialogRef: MatDialogRef<FinishedComponent>,
    private router: Router,
  ) { }
  closePopup(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }


}
