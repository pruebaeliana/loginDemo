import { Component } from '@angular/core';
import { AuthService } from '../authService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }

}
