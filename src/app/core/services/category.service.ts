import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest, Category, CategoryId, ReorderCategoriesRequest, UpdateCategoriesRequest } from '@shared/models/category.model';
import { FinancialRecordType } from '@shared/models/common.model';
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

  updateMultiple(request: UpdateCategoriesRequest) {
    return this.http.put('/api/categories', request);
  }

  reorderCategories(type: FinancialRecordType, request: ReorderCategoriesRequest) {
    return this.http.patch(`/api/categories/${type}/reorder`, request);
  }

  add(command: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>('/api/categories', command);
  }

  delete(id: CategoryId) {
    return this.http.delete(`/api/categories/${id}`);
  }
}
