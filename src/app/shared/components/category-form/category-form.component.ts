import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@shared/models/category.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  @Input()
  categoryType: FinancialRecordType;

  @Output()
  onCategoryAdded: EventEmitter<Category> = new EventEmitter();

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  categoryAddForm: FormGroup;

  private subscritions: Subscription[] = [];

  constructor(private categoryService: CategoryService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.categoryAddForm = this.getForm();
  }

  ngOnDestroy(): void {
    this.subscritions.forEach(s => s.unsubscribe());
  }

  addCategory() {
    if (this.categoryAddForm.valid) {
      const name = this.categoryAddForm.value.name ?? '';
      this.categoryService.add({ name: name, type: this.categoryType }).subscribe({
        next: c => {
          this.snackBar.open('Category added!', 'OK', {
            duration: 3000
          })
          this.onCategoryAdded.emit(c);
          this.resetForm();
        },
        error: () => this.snackBar.open('Duplicate category found!', 'OK', {
          duration: 3000
        })
      })
    }
  }

  resetForm() {
    this.formGroupDirective.resetForm();
    this.categoryAddForm = this.getForm();
  }

  getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }
}
