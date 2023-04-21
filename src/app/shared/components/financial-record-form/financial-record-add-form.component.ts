import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '@shared/models/category.model';
import { FinancialRecord } from '@shared/models/financial-record.model';

@Component({
  selector: 'app-financial-record-add-form',
  templateUrl: './financial-record-add-form.component.html',
  styleUrls: ['./financial-record-add-form.component.scss']
})
export class FinancialRecordAddFormComponent implements OnInit {

  @Input()
  categories: Category[];

  @Output()
  onSubmit = new EventEmitter<FinancialRecord>();

  recordAddForm: FormGroup;

  ngOnInit() {
    this.recordAddForm = this.getForm();
  }

  addRecord() {
    if (this.recordAddForm.valid) {
      this.onSubmit.emit(this.recordAddForm.value);
    }
  }

  getForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      category: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, []),
    });
  }
}
