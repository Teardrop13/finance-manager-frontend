import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '@core/services/category.service';
import { FinancialRecordService } from '@core/services/financial-record.service';
import { Category } from '@shared/models/category.model';
import { Amount, CategoryName, FinancialRecordType } from '@shared/models/common.model';
import { FinancialRecordId, UpdateFinancialRecordRequest } from '@shared/models/financial-record.model';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    @Inject(MAT_DIALOG_DATA) public data: { updateRequest: UpdateFinancialRecordRequest, recordId: FinancialRecordId, recordType: FinancialRecordType, onSave: Function },
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
      const request: UpdateFinancialRecordRequest = this.recordEditForm.value;
      request.transactionDate = dayjs(request.transactionDate).format('DD-MM-YYYY');
      this.subscriptions.push(this.financialRecordService.update(this.data.recordId, request)
        .subscribe(() => {
          this.data.onSave();
          this.dialogRef.close();
        }));
    }
  }

  loadCategories() {
    this.categories$ = this.categoryService.getByType(this.data.recordType);
  }

  getForm(): FormGroup {
    dayjs.extend(customParseFormat)

    const request = this.data.updateRequest;

    return new FormGroup({
      amount: new FormControl<Amount | null>(request.amount, [Validators.required, Validators.min(0)]),
      transactionDate: new FormControl<Date | null>(dayjs(request.transactionDate, 'DD-MM-YYYY').toDate(), [Validators.required]),
      category: new FormControl<CategoryName | null>(request.category, [Validators.required]),
      description: new FormControl<string | null>(request.description, []),
    });
  }
}
