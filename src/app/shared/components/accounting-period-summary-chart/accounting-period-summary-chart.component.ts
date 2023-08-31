import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { AccountingPeriodSummary } from '@shared/models/analysis.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-accounting-period-summary-chart',
  templateUrl: './accounting-period-summary-chart.component.html',
  styleUrls: ['./accounting-period-summary-chart.component.scss']
})
export class AccountingPeriodSummaryChartComponent implements OnDestroy {

  @Input()
  summary: AccountingPeriodSummary;

  chart: Chart;

  ngOnInit(): void {
    Chart.register(...registerables);
    if (this.summary) {
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadChart();
  }

  reloadChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.summary) {
      this.loadChart();
    }
  }

  loadChart(): void {
    this.chart = new Chart("chart", this.getConfig(this.summary));
  }

  getConfig(summary: AccountingPeriodSummary): ChartConfiguration {

    return {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            label: "Income",
            data: [summary.income]
          },
          {
            label: "Expense",
            data: [summary.expense]
          }
        ]
      }
    };
  }
}
