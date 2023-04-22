import { Component, EventEmitter, Output } from '@angular/core';
import { FinancialRecordType } from '@shared/models/financial-record.model';

@Component({
  selector: 'app-financial-record-type-select',
  templateUrl: './financial-record-type-select.component.html',
  styleUrls: ['./financial-record-type-select.component.scss']
})
export class FinancialRecordTypeSelectComponent {

  @Output()
  onTypeSelect = new EventEmitter<FinancialRecordType>();

  addIncome() {
    this.onTypeSelect.emit(FinancialRecordType.INCOME);
  }

  addExpense() {
    this.onTypeSelect.emit(FinancialRecordType.EXPENSE);
  }

}
