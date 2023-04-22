import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { AccountingPeriod } from '@shared/models/period.model';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent {

  newRecordType: FinancialRecordType | undefined;
  chartType: FinancialRecordType = FinancialRecordType.EXPENSE;
  selectedPeriod: AccountingPeriod;

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.closeRecordAddForm();
  }

  openRecordAddForm(type: FinancialRecordType) {
    this.newRecordType = type;
  }

  closeRecordAddForm() {
    this.newRecordType = undefined;
  }

  changeChartType(chartType: FinancialRecordType) {
    this.chartType = chartType;
  }

}
