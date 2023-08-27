import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialRecord, FinancialRecordType } from '@shared/models/financial-record.model';
import { AccountingPeriod } from '@shared/models/period.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialRecordService {

  constructor(private http: HttpClient) {}

  add(financialRecord: FinancialRecord): Observable<FinancialRecord> {
    return this.http.post<FinancialRecord>('/api/records', financialRecord);
  }

  getPage(type: FinancialRecordType, period: AccountingPeriod, page: number, pageSize: number, sortBy: string, isAscending: boolean): Observable<FinancialRecord[]> {
    const params = new HttpParams()
      .append('type', type)
      .append('periodId', period.id)
      .append("page", page)
      .append("pageSize", pageSize)
      .append("sortBy", sortBy)
      .append("isAscending", isAscending);

    return this.http.get<FinancialRecord[]>('/api/records', { params: params });
  }

  getAll(page: number, pageSize: number): Observable<FinancialRecord[]> {
    const params = new HttpParams()
      .append("page", page)
      .append("pageSize", pageSize);

    return this.http.get<FinancialRecord[]>('/api/records/all', { params: params });
  }

  getCount(type: FinancialRecordType, period: AccountingPeriod): Observable<number>;

  getCount(): Observable<number>;

  getCount(type?: FinancialRecordType, period?: AccountingPeriod): Observable<number> {
    if (type !== undefined && period !== undefined) {
      const params = new HttpParams()
        .append('type', type)
        .append('periodId', period.id);
      return this.http.get<number>('/api/records/count', { params: params });
    } else {
      return this.http.get<number>('/api/records/count');
    }
  }

  remove(id: number) {
    return this.http.delete(`/api/records/${id}`);
  }
}
