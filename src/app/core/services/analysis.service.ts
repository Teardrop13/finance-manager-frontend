import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Summary } from '@shared/models/analysis.model';
import { FinancialRecordType } from '@shared/models/financial-record.model';
import { AccountingPeriod } from '@shared/models/period.model';
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
