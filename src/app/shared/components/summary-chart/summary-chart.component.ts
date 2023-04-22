import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AnalysisService } from '@core/services/analysis.service';
import { Summary } from '@shared/models/analysis.model';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { AccountingPeriod } from '@shared/models/period.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.scss']
})
export class SummaryChartComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  type: FinancialRecordType;

  @Input()
  period: AccountingPeriod;

  chart: Chart;

  private subscriptions: Subscription[] = [];

  constructor(private analysisService: AnalysisService) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadChart()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
      this.loadChart();
    }
  }

  loadChart(): void {
    this.subscriptions.push(this.analysisService.getSummary(this.type, this.period).subscribe({
      next: summaries => this.chart = new Chart("chart", this.getConfig(summaries))
    }))

  }

  getConfig(summaries: Summary[]): ChartConfiguration {
    return {
      type: 'pie',
      data: {
        labels: summaries.map(s => s.category),
        datasets: [
          {
            data: summaries.map(s => s.amount)
          }
        ]
      }
    };
  }

}
