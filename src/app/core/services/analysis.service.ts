import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { AccountingPeriodSummary, CategorySummary } from '@shared/models/analysis.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {


  constructor(private http: HttpClient) {}

  getSummaryByCategory(type: FinancialRecordType, period: AccountingPeriod): Observable<CategorySummary[]> {
    const params = new HttpParams()
      .append('type', type)
      .append('periodId', period.id);

    return this.http.get<CategorySummary[]>('/api/analysis/summary/category', { params: params });
  }

  getSummaryByType(period: AccountingPeriod): Observable<AccountingPeriodSummary> {
    const params = new HttpParams()
      .append('periodId', period.id);

    return this.http.get<AccountingPeriodSummary>('/api/analysis/summary/record-type', { params: params });
  }
}
