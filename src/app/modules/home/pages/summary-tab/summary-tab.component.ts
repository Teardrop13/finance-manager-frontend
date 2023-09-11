import { Component } from '@angular/core';
import { AnalysisService } from '@core/services/analysis.service';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { CategorySummary } from '@shared/models/analysis.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent {

  recordType: FinancialRecordType = 'expense';
  selectedPeriod: AccountingPeriod;

  summaries$: Observable<CategorySummary[]>;

  constructor(private analysisService: AnalysisService) {}

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.loadSummary();
  }

  changeRecordType(type: FinancialRecordType) {
    this.recordType = type;
    this.loadSummary();
  }

  loadSummary() {
    this.summaries$ = this.analysisService.getSummaryByCategory(this.recordType, this.selectedPeriod);
  }

}
