import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialRecord } from '@shared/models/financial-record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialRecordService {

  constructor(private http: HttpClient) {}

  add(record: FinancialRecord): Observable<FinancialRecord> {
    return this.http.post<FinancialRecord>('/api/record/add', record);
  }
}