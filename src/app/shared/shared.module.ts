import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { MaterialModule } from '../material/material.module';
import { FinancialRecordAddFormComponent } from './components/financial-record-form/financial-record-add-form.component';
import { SummaryChartComponent } from './components/summary-chart/summary-chart.component';
import { RecordTypeSelectComponent } from './components/chart-type-select/record-type-select.component';



@NgModule({
  declarations: [
    PeriodSelectorComponent,
    FinancialRecordAddFormComponent,
    SummaryChartComponent,
    RecordTypeSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PeriodSelectorComponent,
    FinancialRecordAddFormComponent,
    SummaryChartComponent,
    RecordTypeSelectComponent
  ]
})
export class SharedModule {}
