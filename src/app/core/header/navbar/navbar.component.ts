import { Component } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  showMenu = false;

  constructor(private authentication: AuthenticationService) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authentication.logout();
  }
}
