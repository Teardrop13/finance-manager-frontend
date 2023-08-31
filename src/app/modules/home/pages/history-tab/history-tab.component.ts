import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { FinancialRecord } from '@shared/models/financial-record.model';
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
  recordType: FinancialRecordType = 'expense';
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
    this.subscriptions.push(this.financialRecordService.remove(record.id).subscribe({
      next: res => {
        this.loadRecords();
      }
    }));
  }

  changePeriod(period: AccountingPeriod) {
    this.selectedPeriod = period;
    this.loadRecords();
  }

  changeRecordType(type: FinancialRecordType) {
    this.recordType = type;
    this.loadRecords();
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
      next: history => {
        this.records = history.records;
        this.availableRecords = history.count;
        this.table.renderRows();
      }
    }));
  }
}
