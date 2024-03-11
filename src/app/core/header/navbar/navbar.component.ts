import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  @Output()
  onToggleMenuButtonClick = new EventEmitter();

  private subscriptions: Subscription[] = [];

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleMenu() {
    this.onToggleMenuButtonClick.emit();
  }

  logout() {
    this.subscriptions.push(this.authentication.logout()
      .subscribe(() => this.router.navigateByUrl('/login')));
  }
}
