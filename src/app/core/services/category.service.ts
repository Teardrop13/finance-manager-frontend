import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(type: FinancialRecordType): Observable<Category[]> {
    if (type === FinancialRecordType.INCOME) {
      return this.http.get<Category[]>("/api/category/income");
    } else if (type === FinancialRecordType.EXPENSE) {
      return this.http.get<Category[]>("/api/category/expense");
    } else {
      console.log(`wrong type: ${type}`)
      return of([]);
    }
  }
}
