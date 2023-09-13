import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryTabComponent } from '@features/summary/summary-tab.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryTabRoutingModule {}
