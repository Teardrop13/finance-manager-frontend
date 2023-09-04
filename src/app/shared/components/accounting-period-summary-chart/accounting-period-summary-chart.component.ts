import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { AccountingPeriodSummary } from '@shared/models/analysis.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Observable, Subscription, debounce, fromEvent, timer } from 'rxjs';

@Component({
  selector: 'app-accounting-period-summary-chart',
  templateUrl: './accounting-period-summary-chart.component.html',
  styleUrls: ['./accounting-period-summary-chart.component.scss']
})
export class AccountingPeriodSummaryChartComponent implements OnDestroy {

  @Input()
  summary: AccountingPeriodSummary;

  chart: Chart;

  windowWidth: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  ngOnInit(): void {
    Chart.register(...registerables);
    if (this.summary) {
      this.loadChart();
    }

    this.windowWidth = window.innerWidth

    this.resizeObservable$ = fromEvent(window, 'resize')

    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounce(() => timer(200)))
      .subscribe(evt => {
        const window = evt.target as Window;
        if (window.innerWidth != this.windowWidth) {
          this.windowWidth = window.innerWidth
          this.reloadChart();
        }
      })
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.resizeSubscription$.unsubscribe();
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
