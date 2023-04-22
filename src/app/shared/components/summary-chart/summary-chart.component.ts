import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Summary } from '@shared/models/analysis.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.scss']
})
export class SummaryChartComponent implements OnInit, OnChanges {

  @Input()
  summaries: Summary[];

  chart: Chart;

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
      this.loadChart();
    }
  }

  loadChart(): void {
    this.chart = new Chart("chart", this.getConfig(this.summaries));
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
