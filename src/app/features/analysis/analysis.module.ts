import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AnalysisTabRoutingModule } from './analysis-tab-routing.module';
import { AnalysisTabComponent } from './analysis-tab.component';
import { AccountingPeriodSummaryChartComponent } from './accounting-period-summary-chart/accounting-period-summary-chart.component';



@NgModule({
  declarations: [
    AnalysisTabComponent,
    AccountingPeriodSummaryChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AnalysisTabRoutingModule
  ],
  exports: [
    AnalysisTabComponent
  ]
})
export class AnalysisModule {}
