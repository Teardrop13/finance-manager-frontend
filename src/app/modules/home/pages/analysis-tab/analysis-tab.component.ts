import { Component } from '@angular/core';
import { AnalysisService } from '@core/services/analysis.service';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { AccountingPeriodSummary } from '@shared/models/analysis.model';

@Component({
  selector: 'app-analysis-tab',
  templateUrl: './analysis-tab.component.html',
  styleUrls: ['./analysis-tab.component.scss']
})
export class AnalysisTabComponent {

  selectedPeriod: AccountingPeriod;
  summary: AccountingPeriodSummary;


  constructor(private analysisService: AnalysisService) {}

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.loadSummary();
  }

  loadSummary() {
    this.analysisService.getSummaryByType(this.selectedPeriod).subscribe({
      next: summary => this.summary = summary
    });
  }

}
