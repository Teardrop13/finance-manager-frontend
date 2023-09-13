import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { AnalysisTabComponent } from './pages/analysis-tab/analysis-tab.component';
import { CategoryEditorTabComponent } from './pages/category-editor-tab/category-editor-tab.component';
import { HistoryTabComponent } from './pages/history-tab/history-tab.component';
import { SummaryTabComponent } from './pages/summary-tab/summary-tab.component';



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
