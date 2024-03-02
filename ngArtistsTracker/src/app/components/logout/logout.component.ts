import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private auth: AuthService, private route: Router) {}

  logout() {
    console.log('logging out');
    this.auth.logout();
    this.route.navigateByUrl('/home');
  }
}
