import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { CategoryEditorTabComponent } from './pages/category-editor-tab/category-editor-tab.component';
import { AnalysisTabComponent } from './pages/analysis-tab/analysis-tab.component';
import { HistoryTabComponent } from './pages/history-tab/history-tab.component';
import { SummaryTabComponent } from './pages/summary-tab/summary-tab.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';



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
