import { Component } from '@angular/core';
import { AnalysisService } from '@core/services/analysis.service';
import { Summary } from '@shared/models/analysis.model';
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

  summaries: Summary[] = [];

  constructor(private analysisService: AnalysisService) {}

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.closeRecordAddForm();
    this.loadSummaries();
  }

  openRecordAddForm(type: FinancialRecordType) {
    this.newRecordType = type;
  }

  closeRecordAddForm() {
    this.newRecordType = undefined;
    this.loadSummaries();
  }

  changeChartType(chartType: FinancialRecordType) {
    this.chartType = chartType;
    this.loadSummaries();
  }

  loadSummaries() {
    this.analysisService.getSummary(this.chartType, this.selectedPeriod).subscribe({
      next: summaries => this.summaries = summaries
    });
  }

}
