import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { CategoryEditorTabComponent } from './pages/category-editor-tab/category-editor-tab.component';
import { AnalysisTabComponent } from './pages/analysis-tab/analysis-tab.component';
import { HistoryTabComponent } from './pages/history-tab/history-tab.component';
import { SummaryTabComponent } from './pages/summary-tab/summary-tab.component';

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
