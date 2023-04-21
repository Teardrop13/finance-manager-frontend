import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-financial-record-type-select',
  templateUrl: './financial-record-type-select.component.html',
  styleUrls: ['./financial-record-type-select.component.scss']
})
export class FinancialRecordTypeSelectComponent {

  @Output()
  onTypeSelect = new EventEmitter<Category[]>();

  addIncome() {
    this.onTypeSelect.emit([
      {
        name: "kategoria 1"
      },
      {
        name: "kategoria 2"
      },
      {
        name: "kategoria 3"
      },
    ])
  }

  addExpense() {
    this.onTypeSelect.emit([
      {
        name: "kategoria 4"
      },
      {
        name: "kategoria 5"
      },
      {
        name: "kategoria 6"
      },
    ])
  }

}
