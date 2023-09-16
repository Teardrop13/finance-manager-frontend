import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountingPeriod } from '@shared/models/accounting-period.model';
import { FinancialRecordType } from '@shared/models/common.model';
import { CreateFinancialRecordRequest, FinancialRecord, FinancialRecordId, FinancialRecordsHistory, UpdateFinancialRecordRequest } from '@shared/models/financial-record.model';
import BigNumber from 'bignumber.js';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialRecordService {

  constructor(private http: HttpClient) {}

  create(request: CreateFinancialRecordRequest): Observable<FinancialRecord> {
    return this.http.post<FinancialRecord>('/api/records', request);
  }

  update(id: FinancialRecordId, request: UpdateFinancialRecordRequest): Observable<FinancialRecord> {
    return this.http.put<FinancialRecord>(`/api/records/${id}`, request);
  }

  getPage(type: FinancialRecordType,
    period: AccountingPeriod,
    page: number,
    pageSize: number,
    sortBy: string,
    isAscending: boolean): Observable<FinancialRecordsHistory> {
    const params = new HttpParams()
      .append('type', type)
      .append('periodId', period.id)
      .append("page", page)
      .append("pageSize", pageSize)
      .append("sortBy", sortBy)
      .append("isAscending", isAscending);

    return this.http.get<FinancialRecordsHistory>('/api/records', { params: params })
      .pipe(
        map(history => ({
          ...history,
          records: history.records.map(record => ({
            ...record,
            amount: new BigNumber(record.amount)
          }))
        }))
      );
  }

  delete(id: FinancialRecordId) {
    return this.http.delete(`/api/records/${id}`);
  }
}
