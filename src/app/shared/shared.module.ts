import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PeriodSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PeriodSelectorComponent
  ]
})
export class SharedModule {}
