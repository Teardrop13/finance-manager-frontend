import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}
