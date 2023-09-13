import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryEditorTabComponent } from './category-editor-tab.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryEditorTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryEditorTabRoutingModule {}
