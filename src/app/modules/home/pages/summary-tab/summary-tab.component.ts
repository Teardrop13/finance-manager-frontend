import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { AccountingPeriod } from '@shared/models/period.model';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent {


  @ViewChild("typeSelect")
  typeSelect: ElementRef;

  @ViewChild("recordAddForm")
  recordAddForm: ElementRef;

  categories: Category[] = [];
  
  changePeriod(period: AccountingPeriod) {
    this.categories.splice(0);
  }

  openRecordAddForm(categories: Category[]) {
    this.categories.push(...categories);
  }

  closeRecordAddForm() {
    this.categories.splice(0);
  }

}
