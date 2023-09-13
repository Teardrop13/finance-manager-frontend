import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisTabComponent } from './analysis-tab.component';

const routes: Routes = [
  {
    path: '',
    component: AnalysisTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisTabRoutingModule {}
