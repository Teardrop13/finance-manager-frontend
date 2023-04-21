import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getIncomeCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/category/income");
  }

  getExpenseCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/category/expense");
  }
}
