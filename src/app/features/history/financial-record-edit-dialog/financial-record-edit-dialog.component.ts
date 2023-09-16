import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '@core/services/category.service';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { Category } from '@shared/models/category.model';
import { CategoryName } from '@shared/models/common.model';
import { FinancialRecord, UpdateFinancialRecordRequest } from '@shared/models/financial-record.model';
import BigNumber from 'bignumber.js';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-financial-record-edit-dialog',
  templateUrl: './financial-record-edit-dialog.component.html',
  styleUrls: ['./financial-record-edit-dialog.component.scss']
})
export class FinancialRecordEditDialogComponent implements OnInit, OnDestroy {

  recordEditForm: FormGroup;

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  categories$: Observable<Category[]>;

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { record: FinancialRecord, onSave: Function },
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private financialRecordService: FinancialRecordService,
    private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.recordEditForm = this.getForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateRecord() {
    if (this.recordEditForm.valid) {
      const form = this.recordEditForm.value;

      const request: UpdateFinancialRecordRequest = {
        description: form.description,
        amount: new BigNumber(form.amount.replace(',', '.')),
        category: form.category,
        transactionDate: dayjs(form.transactionDate).format('DD-MM-YYYY'),
      }

      this.subscriptions.push(this.financialRecordService.update(this.data.record.id, request)
        .subscribe(() => {
          this.data.onSave();
          this.dialogRef.close();
        }));
    }
  }

  loadCategories() {
    this.categories$ = this.categoryService.getByType(this.data.record.type);
  }

  getForm(): FormGroup {
    dayjs.extend(customParseFormat)

    const record = this.data.record;

    return new FormGroup({
      amount: new FormControl<string>(record.amount.toFormat(2), [Validators.required]),
      transactionDate: new FormControl<Date>(dayjs(record.transactionDate, 'DD-MM-YYYY').toDate(), [Validators.required]),
      category: new FormControl<CategoryName>(record.category, [Validators.required]),
      description: new FormControl<string | null>(record.description, []),
    });
  }
}
