import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { MaterialModule } from '../material/material.module';
import { FinancialRecordTypeSelectComponent } from './components/financial-record-type-select/financial-record-type-select.component';
import { FinancialRecordAddFormComponent } from './components/financial-record-form/financial-record-add-form.component';



@NgModule({
  declarations: [
    PeriodSelectorComponent,
    FinancialRecordTypeSelectComponent,
    FinancialRecordAddFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PeriodSelectorComponent,
    FinancialRecordTypeSelectComponent,
    FinancialRecordAddFormComponent
  ]
})
export class SharedModule {}
