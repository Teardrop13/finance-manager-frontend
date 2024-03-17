import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from '@core/services/category.service';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { Category } from '@shared/models/category.model';
import { CategoryName, FinancialRecordType } from '@shared/models/common.model';
import { CreateFinancialRecordRequest, FinancialRecord } from '@shared/models/financial-record.model';
import BigNumber from 'bignumber.js';
import * as dayjs from 'dayjs';
import { Observable, Subscription } from 'rxjs';

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

  categories$: Observable<Category[]>;

  recordAddForm: FormGroup;

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  private subscriptions: Subscription[] = [];

  constructor(private financialRecordService: FinancialRecordService,
    private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.recordAddForm = this.getNewForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCategories();
    if (this.recordAddForm) {
      this.resetAll();
    }
  }

  loadCategories() {
    this.categories$ = this.categoryService.getByType(this.type);
  }

  addRecord() {
    if (this.recordAddForm.valid) {
      const form = this.recordAddForm.value;

      const request: CreateFinancialRecordRequest = {
        type: this.type,
        amount: new BigNumber(form.amount.replace(',', '.')),
        transactionDate: dayjs(form.transactionDate).format('DD-MM-YYYY'),
        category: form.category,
        description: form.description,
      };

      this.subscriptions.push(this.financialRecordService.create(request)
        .subscribe({
          next: r => {
            this.onSubmit.emit(r);
            this.resetValueAndDescription();
          }
        }));
    }
  }

  resetValueAndDescription() {
    if (this.recordAddForm.valid) {
      const currentAddForm = this.recordAddForm.value;

      this.resetAll();
      this.recordAddForm.patchValue({
        transactionDate: currentAddForm.transactionDate,
        category: currentAddForm.category
      })
    }
  }

  resetAll() {
    this.formGroupDirective.resetForm();
    this.recordAddForm = this.getNewForm();
  }

  getNewForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl<string | null>(null, [Validators.required]),
      transactionDate: new FormControl<Date | null>(new Date(), [Validators.required]),
      category: new FormControl<CategoryName | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, []),
    });
  }
}
