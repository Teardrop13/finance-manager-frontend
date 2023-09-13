import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { CategoryEditorTabComponent } from '@features/category-editor/category-editor-tab.component';
import { AnalysisTabComponent } from '@features/analysis/analysis-tab.component';
import { HistoryTabComponent } from '@features/history/history-tab.component';
import { SummaryTabComponent } from '@features/summary/summary-tab.component';



@NgModule({
  declarations: [
    CategoryEditorTabComponent,
    AnalysisTabComponent,
    HistoryTabComponent,
    SummaryTabComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class HomeModule {}
