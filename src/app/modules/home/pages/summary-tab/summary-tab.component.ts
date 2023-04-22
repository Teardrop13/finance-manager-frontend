import { Component } from '@angular/core';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { AccountingPeriod } from '@shared/models/period.model';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent {

  type: FinancialRecordType | undefined;

  changePeriod(period: AccountingPeriod) {
    this.closeRecordAddForm();
  }

  openRecordAddForm(type: FinancialRecordType) {
    this.type = type;
  }

  closeRecordAddForm() {
    this.type = undefined;
  }

}
