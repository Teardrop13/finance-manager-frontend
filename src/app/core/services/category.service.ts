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

  getByType(type: FinancialRecordType): Observable<Category[]> {
    if (type === FinancialRecordType.INCOME) {
      return this.http.get<Category[]>("/api/categories/income");
    } else if (type === FinancialRecordType.EXPENSE) {
      return this.http.get<Category[]>("/api/categories/expense");
    } else {
      console.log(`wrong type: ${type}`)
      return of([]);
    }
  }

  saveMultiple(categories: Category[]) {
    return this.http.put('/api/categories', categories);
  }

  add(name: string, type: FinancialRecordType): Observable<Category> {
    return this.http.post<Category>('/api/categories', { name: name, type: type });
  }

  delete(id: number) {
    return this.http.delete(`/api/categories/${id}`);
  }
}
