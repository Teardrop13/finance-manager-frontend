import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AccountingPeriodSummary } from '@shared/models/analysis.model';
import BigNumber from 'bignumber.js';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Observable, Subscription, debounce, fromEvent, timer } from 'rxjs';

@Component({
  selector: 'app-accounting-period-summary-chart',
  templateUrl: './accounting-period-summary-chart.component.html',
  styleUrls: ['./accounting-period-summary-chart.component.scss']
})
export class AccountingPeriodSummaryChartComponent implements OnInit, OnDestroy {

  @Input()
  summary: AccountingPeriodSummary;

  chart: Chart;

  windowWidth: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  ngOnInit(): void {
    Chart.register(...registerables);

    this.loadChart();

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

  reloadChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.loadChart();
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
            data: [summary.income.toNumber()]
          },
          {
            label: "Expense",
            data: [summary.expense.toNumber()]
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (item) => new BigNumber(`${item.raw}`).toFormat()
            }
          }
        }
      }
    };
  }
}
