import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { CategoryEditorTabComponent } from '@features/category-editor/category-editor-tab.component';
import { SummaryTabComponent } from '@features/summary/summary-tab.component';
import { AnalysisTabComponent } from '@features/analysis/analysis-tab.component';
import { HistoryTabComponent } from '@features/history/history-tab.component';

const routes: Routes = [
  {
    path: 'summary',
    component: SummaryTabComponent
  },
  {
    path: 'categories',
    component: CategoryEditorTabComponent
  },
  {
    path: 'analysis',
    component: AnalysisTabComponent
  },
  {
    path: 'history',
    component: HistoryTabComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'summary'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
