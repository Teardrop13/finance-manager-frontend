import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { HistoryTabRoutingModule } from './history-tab-routing.module';
import { HistoryTabComponent } from './history-tab.component';



@NgModule({
  declarations: [
    HistoryTabComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HistoryTabRoutingModule
  ],
  exports: [
    HistoryTabComponent
  ]
})
export class HistoryModule {}
