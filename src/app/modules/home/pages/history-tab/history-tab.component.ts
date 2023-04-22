import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { FinancialRecord } from '@shared/models/financial-record.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss']
})
export class HistoryTabComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table: MatTable<FinancialRecord>;
  displayedColumns: string[] = ['amount', 'category', 'transactionDate', 'description'];

  page = 0;
  pageSize = 10;
  availableRecords = 0;

  records: FinancialRecord[] = [];

  subscriptions: Subscription[] = [];

  constructor(private financialRecordService: FinancialRecordService) {}

  ngOnInit(): void {
    this.loadCount();
    this.loadRecords();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadCount() {
    this.subscriptions.push(this.financialRecordService.getCount().subscribe({
      next: number => this.availableRecords = number
    }))
  }

  loadRecords() {
    this.subscriptions.push(this.financialRecordService.getAll(this.page, this.pageSize).subscribe({
      next: records => {
        this.records.splice(0, this.records.length, ...records);
        this.table.renderRows();
      }
    }));
  }

  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.pageSize = e.pageSize;
    this.page = e.pageIndex;
    this.loadRecords();
  }

}
