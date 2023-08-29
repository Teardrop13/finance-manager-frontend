import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { Summary } from '@shared/models/analysis.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {


  constructor(private http: HttpClient) { }

  getSummary(type: FinancialRecordType, period: AccountingPeriod): Observable<Summary[]> {
    const params = new HttpParams()
    .append('type', type)
    .append('periodId', period.id);

    return this.http.get<Summary[]>('/api/analysis/summary', {params: params});
  }
}
