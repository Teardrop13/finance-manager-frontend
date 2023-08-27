import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryCommand, Category, CategoryId } from '@shared/models/category.model';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getByType(type: FinancialRecordType): Observable<Category[]> {
    if (type === 'income') {
      return this.http.get<Category[]>("/api/categories/income");
    } else if (type === 'expense') {
      return this.http.get<Category[]>("/api/categories/expense");
    } else {
      console.log(`wrong type: ${type}`)
      return of([]);
    }
  }

  saveMultiple(categories: Category[]) {
    return this.http.put('/api/categories', categories);
  }

  add(command: AddCategoryCommand): Observable<Category> {
    return this.http.post<Category>('/api/categories', command);
  }

  delete(id: CategoryId) {
    return this.http.delete(`/api/categories/${id}`);
  }
}
