import { Component } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { TokenSharing } from '@core/authentication/services/token-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finance-manager-frontend';

  constructor(private authentication: AuthenticationService,
    private tokenSharing: TokenSharing) {
    tokenSharing.requestToken();
  }

  isAuthenticated() {
    return this.authentication.isAuthenticated();
  }
}
