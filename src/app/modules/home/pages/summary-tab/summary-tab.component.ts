import { Component, OnInit } from '@angular/core';
import { AccountingPeriod } from '@shared/models/period.model';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }



  changePeriod(period: AccountingPeriod) {

  }



}
