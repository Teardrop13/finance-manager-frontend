import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { SummaryTabRoutingModule } from './summary-tab-routing.module';
import { SummaryTabComponent } from './summary-tab.component';



@NgModule({
  declarations: [SummaryTabComponent],
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
