import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { SummaryTabRoutingModule } from './summary-tab-routing.module';
import { SummaryTabComponent } from './summary-tab.component';
import { FinancialRecordAddFormComponent } from './financial-record-form/financial-record-add-form.component';
import { SummaryByCategoryChartComponent } from './summary-by-category-chart/summary-by-category-chart.component';



@NgModule({
  declarations: [
    SummaryTabComponent,
    FinancialRecordAddFormComponent,
    SummaryByCategoryChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    SummaryTabRoutingModule
  ],
  exports: [
    SummaryTabComponent
  ]
})
export class SummaryModule {}
