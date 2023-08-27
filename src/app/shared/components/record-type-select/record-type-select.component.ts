import { Component, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FinancialRecordType } from '@shared/models/financial-record.model';

@Component({
  selector: 'app-record-type-select',
  templateUrl: './record-type-select.component.html',
  styleUrls: ['./record-type-select.component.scss']
})
export class RecordTypeSelectComponent {

  @Output()
  onTypeChanged: EventEmitter<FinancialRecordType> = new EventEmitter();

  changeChartType(change: MatRadioChange) {
    this.onTypeChanged.emit(change.value);
  }
}
