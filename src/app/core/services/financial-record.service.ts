import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { CreateFinancialRecordCommand, FinancialRecord, FinancialRecordId } from '@shared/models/financial-record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialRecordService {

  constructor(private http: HttpClient) {}

  create(command: CreateFinancialRecordCommand): Observable<FinancialRecord> {
    return this.http.post<FinancialRecord>('/api/records', command);
  }

  getPage(type: FinancialRecordType,
    period: AccountingPeriod,
    page: number,
    pageSize: number,
    sortBy: string,
    isAscending: boolean): Observable<FinancialRecord[]> {
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

  remove(id: FinancialRecordId) {
    return this.http.delete(`/api/records/${id}`);
  }
}
