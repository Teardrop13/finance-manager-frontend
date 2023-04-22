import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '@core/services/category.service';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { Category } from '@shared/models/category.model';
import { FinancialRecord, FinancialRecordType } from '@shared/models/financial-record.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-record-add-form',
  templateUrl: './financial-record-add-form.component.html',
  styleUrls: ['./financial-record-add-form.component.scss']
})
export class FinancialRecordAddFormComponent implements OnInit, OnDestroy {

  @Input()
  type: FinancialRecordType;

  categories: Category[] = [];

  @Output()
  onSubmit = new EventEmitter<FinancialRecord>();

  recordAddForm: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(private financialRecordService: FinancialRecordService,
    private categoryService: CategoryService) {}

  ngOnInit() {
    this.subscriptions.push(this.categoryService.getCategories(this.type)
      .subscribe({
        next: categories => {
          this.categories.push(...categories);
          this.recordAddForm = this.getForm();
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addRecord() {
    if (this.recordAddForm.valid) {
      const financialRecord = this.recordAddForm.value;
      financialRecord.type = this.type;
      console.log(financialRecord)
      this.subscriptions.push(this.financialRecordService.add(financialRecord)
        .subscribe({
          next: r => {
            this.onSubmit.emit(r);
          }
        }));
    }
  }

  getForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      transactionDate: new FormControl<Date | null>(new Date(), [Validators.required]),
      category: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, []),
    });
  }
}
