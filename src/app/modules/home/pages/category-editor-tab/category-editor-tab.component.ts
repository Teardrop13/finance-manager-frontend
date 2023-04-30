import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@shared/models/category.model';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-category-editor-tab',
  templateUrl: './category-editor-tab.component.html',
  styleUrls: ['./category-editor-tab.component.scss']
})
export class CategoryEditorTabComponent implements OnInit, OnDestroy {

  type: FinancialRecordType = FinancialRecordType.EXPENSE;
  categories: Category[] = [];
  private subscribtions: Subscription[] = [];

  constructor(private categoryService: CategoryService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(s => s.unsubscribe());
  }

  loadCategories() {
    this.subscribtions.push(this.categoryService.getByType(this.type).subscribe({
      next: categories => this.categories = categories
    }));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    this.reorderCategories();
  }

  private reorderCategories() {
    this.categories.forEach((category, index) => category.priority = index + 1);
    this.subscribtions.push(this.categoryService.saveMultiple(this.categories).subscribe({
      next: res => this.snackBar.open('Categories saved', 'OK', {
        duration: 3000
      })
    }));
  }

  delete(category: Category) {
    this.subscribtions.push(this.categoryService.delete(category.id).subscribe({
      next: res => {
        this.snackBar.open(`"${category.name}" category deleted!`, 'OK', {
          duration: 3000
        });
        this.loadCategories();
      }
    }))
  }

  setType(type: FinancialRecordType) {
    this.type = type;
    this.loadCategories();
  }

}
