import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component } from '@angular/core';
import BigNumber from 'bignumber.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finance-manager-frontend';

  constructor() {
    registerLocaleData(localePl);

    BigNumber.config({
      FORMAT: {
        decimalSeparator: ','
      }
    });
  }
}
