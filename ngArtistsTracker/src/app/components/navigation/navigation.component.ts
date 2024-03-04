import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { HomeComponent } from "../home/home.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [
        CommonModule,
        RouterLink,
        NgbModule,
        LoginComponent,
        LogoutComponent,
        HomeComponent
    ]
})
export class NavigationComponent {
  public isCollapsed = false;

  constructor(private auth: AuthService) {}

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }
}
