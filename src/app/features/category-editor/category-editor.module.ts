import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { CategoryEditorTabRoutingModule } from './category-editor-tab-routing.module';
import { CategoryEditorTabComponent } from './category-editor-tab.component';



@NgModule({
  declarations: [
    CategoryEditorTabComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CategoryEditorTabRoutingModule
  ],
  exports: [
    CategoryEditorTabComponent
  ]
})
export class CategoryEditorModule {}
