import { Component, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FinancialRecordType } from '@shared/models/financial-record.model';

@Component({
  selector: 'app-chart-type-select',
  templateUrl: './chart-type-select.component.html',
  styleUrls: ['./chart-type-select.component.scss']
})
export class ChartTypeSelectComponent {

  @Output()
  onChartTypeChanged: EventEmitter<FinancialRecordType> = new EventEmitter();

  changeChartType(change: MatRadioChange) {
    this.onChartTypeChanged.emit(FinancialRecordType[change.value.toUpperCase()]);
  }
}
