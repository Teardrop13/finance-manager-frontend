import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';
import { AccountingPeriodSummaryChartComponent } from './components/accounting-period-summary-chart/accounting-period-summary-chart.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { FinancialRecordAddFormComponent } from './components/financial-record-form/financial-record-add-form.component';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { RecordTypeSelectComponent } from './components/record-type-select/record-type-select.component';
import { SummaryChartComponent } from './components/summary-by-category-chart/summary-by-category-chart.component';
import { FinancialRecordEditDialogComponent } from './components/financial-record-edit-dialog/financial-record-edit-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

export const FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@NgModule({
  declarations: [
    PeriodSelectorComponent,
    FinancialRecordAddFormComponent,
    SummaryChartComponent,
    RecordTypeSelectComponent,
    CategoryFormComponent,
    AccountingPeriodSummaryChartComponent,
    FinancialRecordEditDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PeriodSelectorComponent,
    FinancialRecordAddFormComponent,
    SummaryChartComponent,
    AccountingPeriodSummaryChartComponent,
    RecordTypeSelectComponent,
    CategoryFormComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: FORMATS }
  ]
})
export class SharedModule {}
