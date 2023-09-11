import { Component } from '@angular/core';
import { AnalysisService } from '@core/services/analysis.service';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { AccountingPeriodSummary } from '@shared/models/analysis.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analysis-tab',
  templateUrl: './analysis-tab.component.html',
  styleUrls: ['./analysis-tab.component.scss']
})
export class AnalysisTabComponent {

  selectedPeriod: AccountingPeriod;
  summary$: Observable<AccountingPeriodSummary>;


  constructor(private analysisService: AnalysisService) {}

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.loadSummary();
  }

  loadSummary() {
    this.summary$ = this.analysisService.getSummaryByType(this.selectedPeriod);
  }

}
