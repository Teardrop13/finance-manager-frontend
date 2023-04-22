import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { MaterialModule } from '../material/material.module';
import { FinancialRecordTypeSelectComponent } from './components/financial-record-type-select/financial-record-type-select.component';
import { FinancialRecordAddFormComponent } from './components/financial-record-form/financial-record-add-form.component';
import { SummaryChartComponent } from './components/summary-chart/summary-chart.component';
import { RecordTypeSelectComponent } from './components/chart-type-select/chart-type-select.component';



@NgModule({
  declarations: [
    PeriodSelectorComponent,
    FinancialRecordTypeSelectComponent,
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
    FinancialRecordTypeSelectComponent,
    FinancialRecordAddFormComponent,
    SummaryChartComponent,
    RecordTypeSelectComponent
  ]
})
export class SharedModule {}
