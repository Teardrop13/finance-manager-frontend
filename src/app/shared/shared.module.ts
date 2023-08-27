import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { MaterialModule } from '../material/material.module';
import { FinancialRecordAddFormComponent } from './components/financial-record-form/financial-record-add-form.component';
import { SummaryChartComponent } from './components/summary-chart/summary-chart.component';
import { RecordTypeSelectComponent } from './components/record-type-select/record-type-select.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PeriodSelectorComponent,
    FinancialRecordAddFormComponent,
    SummaryChartComponent,
    RecordTypeSelectComponent,
    CategoryFormComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: FORMATS }
  ]
})
export class SharedModule {}
