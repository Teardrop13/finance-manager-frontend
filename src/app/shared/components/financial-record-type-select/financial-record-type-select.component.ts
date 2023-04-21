import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-record-type-select',
  templateUrl: './financial-record-type-select.component.html',
  styleUrls: ['./financial-record-type-select.component.scss']
})
export class FinancialRecordTypeSelectComponent implements OnDestroy {

  @Output()
  onTypeSelect = new EventEmitter<Category[]>();

  private subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addIncome() {
    this.subscriptions.push(this.categoryService.getIncomeCategories().subscribe({
      next: categories => this.onTypeSelect.emit(categories)
    }));
  }

  addExpense() {
    this.subscriptions.push(this.categoryService.getExpenseCategories().subscribe({
      next: categories => this.onTypeSelect.emit(categories)
    }));
  }

}
