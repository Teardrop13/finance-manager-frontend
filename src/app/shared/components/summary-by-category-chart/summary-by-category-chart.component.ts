import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CategorySummary } from '@shared/models/analysis.model';
import BigNumber from 'bignumber.js';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Observable, Subscription, debounce, fromEvent, timer } from 'rxjs';

@Component({
  selector: 'app-summary-by-category-chart',
  templateUrl: './summary-by-category-chart.component.html',
  styleUrls: ['./summary-by-category-chart.component.scss']
})
export class SummaryChartComponent implements OnInit, OnDestroy {

  @Input()
  summaries: CategorySummary[];

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

  reloadChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.loadChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.resizeSubscription$.unsubscribe();
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
            data: summaries.map(s => s.amount.toNumber())
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
