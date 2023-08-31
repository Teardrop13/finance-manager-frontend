import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from '@core/services/category.service';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { Category } from '@shared/models/category.model';
import { Amount, CategoryName, FinancialRecordType } from '@shared/models/common.model';
import { CreateFinancialRecordRequest, FinancialRecord } from '@shared/models/financial-record.model';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-record-add-form',
  templateUrl: './financial-record-add-form.component.html',
  styleUrls: ['./financial-record-add-form.component.scss']
})
export class FinancialRecordAddFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  type: FinancialRecordType;

  @Output()
  onSubmit = new EventEmitter<FinancialRecord>();

  categories: Category[] = [];

  recordAddForm: FormGroup;

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  private subscriptions: Subscription[] = [];

  constructor(private financialRecordService: FinancialRecordService,
    private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.recordAddForm = this.getForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCategories();
    if (this.recordAddForm) {
      this.resetForm();
    }
  }

  loadCategories() {
    this.subscriptions.push(this.categoryService.getByType(this.type)
      .subscribe({
        next: categories => {
          this.categories = categories;
        }
      }));
  }

  addRecord() {
    if (this.recordAddForm.valid) {
      const request: CreateFinancialRecordRequest = this.recordAddForm.value;
      request.type = this.type;
      request.transactionDate = dayjs(request.transactionDate).format('DD-MM-YYYY');
      this.subscriptions.push(this.financialRecordService.create(request)
        .subscribe({
          next: r => {
            this.onSubmit.emit(r);
            this.resetForm();
          }
        }));
    }
  }

  resetForm() {
    this.formGroupDirective.resetForm();
    this.recordAddForm = this.getForm();
  }

  getForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl<Amount | null>(null, [Validators.required, Validators.min(0)]),
      transactionDate: new FormControl<Date | null>(new Date(), [Validators.required]),
      category: new FormControl<CategoryName | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, []),
    });
  }
}
