import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { effect } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrialsService {
  private apiUrl = 'https://clinicaltrials.gov/api/v2/studies';
  private nextToken: string | null = null;

  constructor(private http: HttpClient) {}

  fetchInitialTrials(): Observable<any> {
    this.nextToken = null;
    return this.http.get(`${this.apiUrl}?pageSize=10`);
  }

  fetchNextTrial(): Observable<any> {
    const url = this.nextToken
      ? `${this.apiUrl}?pageSize=1&pageToken=${this.nextToken}`
      : `${this.apiUrl}?pageSize=1`;

    return this.http.get(url).pipe(
      tap((res: any) => {
        this.nextToken = res?.nextPageToken ?? null;
      })
    );
  }
}
