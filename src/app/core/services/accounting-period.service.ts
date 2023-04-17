import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountingPeriod } from '@shared/models/period.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountingPeriodService {

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<AccountingPeriod> {
    return this.http.get<AccountingPeriod>('/api/accounting-period/current');
  }

  getNext(period: AccountingPeriod): Observable<AccountingPeriod> {
    const params = new HttpParams()
      .append("currentId", period.id);

    return this.http.get<AccountingPeriod>('/api/accounting-period/next', { params: params });
  }

  getPrevious(period: AccountingPeriod): Observable<AccountingPeriod> {
    const params = new HttpParams()
      .append("currentId", period.id);

    return this.http.get<AccountingPeriod>('/api/accounting-period/previous', { params: params });
  }

}
