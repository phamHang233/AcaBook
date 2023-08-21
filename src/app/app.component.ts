import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AcaBook';
  user!: User;

  constructor(private authService: AuthService) {
  }
  isAdmin() {
    if (this.authService.userValue != null && this.authService.userValue.role == "admin") {
      return true
    }
    else return false
  }

}

