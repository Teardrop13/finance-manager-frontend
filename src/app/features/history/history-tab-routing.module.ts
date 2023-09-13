import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryTabComponent } from './history-tab.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryTabRoutingModule {}
