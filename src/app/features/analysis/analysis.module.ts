import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AnalysisTabRoutingModule } from './analysis-tab-routing.module';
import { AnalysisTabComponent } from './analysis-tab.component';



@NgModule({
  declarations: [
    AnalysisTabComponent
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
