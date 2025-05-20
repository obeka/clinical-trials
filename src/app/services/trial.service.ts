import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrialsService {
  private apiUrl = 'https://clinicaltrials.gov/api/v2/studies';
  private nextToken: string | null = null;

  public trials = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchInitialTrials(): Observable<any> {
    this.nextToken = null;
    return this.http.get(`${this.apiUrl}?pageSize=10`).pipe(
      tap((res: any) => {
        this.trials.set(res.studies || []);
        this.nextToken = res.nextPageToken ?? null;
      })
    );
  }

  fetchNextTrial(): Observable<any> {
    const url = this.nextToken
      ? `${this.apiUrl}?pageSize=1&pageToken=${this.nextToken}`
      : `${this.apiUrl}?pageSize=1`;

    return this.http.get(url).pipe(
      tap((res: any) => {
        const newTrial = res.studies?.[0];
        if (newTrial) {
          const current = this.trials();
          this.trials.set([newTrial, ...current.slice(0, 9)]);
        }
        this.nextToken = res.nextPageToken ?? null;
      })
    );
  }

  getNextPageToken() {
    return this.nextToken;
  }

  setNextPageToken(token: string | null) {
    this.nextToken = token;
  }
}
