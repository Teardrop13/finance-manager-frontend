import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CategorySummary } from '@shared/models/analysis.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-summary-by-category-chart',
  templateUrl: './summary-by-category-chart.component.html',
  styleUrls: ['./summary-by-category-chart.component.scss']
})
export class SummaryChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  summaries: CategorySummary[];

  chart: Chart;

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadChart();
  }

  reloadChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.summaries.length > 0) {
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadChart(): void {
    this.chart = new Chart("chart", this.getConfig(this.summaries));
  }

  getConfig(summaries: CategorySummary[]): ChartConfiguration {
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
