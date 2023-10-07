import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'summary',
    loadChildren: () => import('@features/summary/summary.module').then(m => m.SummaryModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('@features/category-editor/category-editor.module').then(m => m.CategoryEditorModule)
  },
  {
    path: 'analysis',
    loadChildren: () => import('@features/analysis/analysis.module').then(m => m.AnalysisModule)
  },
  {
    path: 'history',
    loadChildren: () => import('@features/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'summary'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
