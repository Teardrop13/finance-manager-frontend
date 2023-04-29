import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialRecord } from '@shared/models/financial-record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialRecordService {

  constructor(private http: HttpClient) {}

  add(financialRecord: FinancialRecord): Observable<FinancialRecord> {
    return this.http.post<FinancialRecord>('/api/records', financialRecord);
  }

  getAll(page: number, pageSize: number): Observable<FinancialRecord[]> {
    const params = new HttpParams()
      .append("page", page)
      .append("pageSize", pageSize);

    return this.http.get<FinancialRecord[]>('/api/records', { params: params });
  }

  getCount() {
    return this.http.get<number>('/api/records/count');
  }

  remove(id: number) {
    return this.http.delete(`/api/records/${id}`);
  }
}
