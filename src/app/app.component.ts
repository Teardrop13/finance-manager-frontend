import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import BigNumber from 'bignumber.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finance-manager-frontend';

  constructor(private authentication: AuthenticationService) {
    registerLocaleData(localePl);

    BigNumber.config({
      FORMAT: {
        decimalSeparator: ','
      }
    });
  }

  isAuthenticated() {
    return this.authentication.isAuthenticated();
  }
}
