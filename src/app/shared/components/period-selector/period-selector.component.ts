import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AccountingPeriodService } from '@core/services/accounting-period.service';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnInit, OnDestroy {

  @Output()
  onPeriodSelected: EventEmitter<AccountingPeriod> = new EventEmitter();

  currentPeriod: AccountingPeriod;

  subscriptions: Subscription[] = [];

  constructor(private periodService: AccountingPeriodService) {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.periodService.getCurrent().subscribe({
      next: period => {
        this.currentPeriod = period;
        this.onPeriodSelected.emit(period);
      }
    }));
  }

  getNext(): void {
    this.subscriptions.push(this.periodService.getNext(this.currentPeriod).subscribe({
      next: period => {
        this.currentPeriod = period;
        this.onPeriodSelected.emit(period);
      }
    }));
  }

  getPrevious(): void {
    this.subscriptions.push(this.periodService.getPrevious(this.currentPeriod).subscribe({
      next: period => {
        this.currentPeriod = period;
        this.onPeriodSelected.emit(period);
      }
    }));
  }
}
