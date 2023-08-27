import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { FinancialRecord, FinancialRecordType } from '@shared/models/financial-record.model';
import { AccountingPeriod } from '@shared/models/period.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss']
})
export class HistoryTabComponent implements OnDestroy {

  @ViewChild(MatTable) table: MatTable<FinancialRecord>;
  displayedColumns: string[] = ['amount', 'category', 'transactionDate', 'description', 'action'];

  page = 0;
  pageSize = 10;
  availableRecords = 0;
  recordType: FinancialRecordType = FinancialRecordType.EXPENSE;
  selectedPeriod: AccountingPeriod;

  sortBy = "transactionDate";
  isAscending = false;

  records: FinancialRecord[] = [];

  subscriptions: Subscription[] = [];

  constructor(private financialRecordService: FinancialRecordService) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.page = e.pageIndex;
    this.loadRecords();
  }

  remove(record: FinancialRecord) {
    if (!record.id) {
      console.error('Record does not have id');
      return
    }

    this.subscriptions.push(this.financialRecordService.remove(record.id).subscribe({
      next: res => {
        this.loadRecords();
        this.loadCount();
      }
    }));
  }

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.loadRecords();
    this.loadCount();
  }

  changeRecordType(type: FinancialRecordType) {
    this.recordType = type;
    this.loadRecords();
    this.loadCount();
  }

  changeSorting(sortState: Sort) {
    if (sortState.direction === '') {
      this.sortBy = 'transactionDate';
      this.isAscending = false;
    } else {
      this.sortBy = sortState.active;
      this.isAscending = sortState.direction === 'asc';
    }

    this.loadRecords();
  }

  loadRecords() {
    this.subscriptions.push(this.financialRecordService.getPage(this.recordType, this.selectedPeriod, this.page, this.pageSize, this.sortBy, this.isAscending).subscribe({
      next: records => {
        this.records = records;
        this.table.renderRows();
      }
    }));
  }

  loadCount() {
    this.subscriptions.push(this.financialRecordService.getCount(this.recordType, this.selectedPeriod).subscribe({
      next: number => this.availableRecords = number
    }))
  }
}
