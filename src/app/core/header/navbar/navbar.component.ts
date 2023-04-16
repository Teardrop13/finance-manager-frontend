import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  displayMenuButton: boolean = true;

  constructor(private responsive: BreakpointObserver,
    private authentication: AuthenticationService) {}


  ngOnInit() {
    this.responsive.observe(Breakpoints.Small)
      .subscribe(result => {

        if (result.matches) {
          this.displayMenuButton = true;
        } else {
          this.displayMenuButton = false;
        }

      });
  }

  toggleMenu() {

  }

  logout() {
    this.authentication.logout();
  }
}
