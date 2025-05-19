import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { effect } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrialsService {
  private apiUrl = 'https://clinicaltrials.gov/api/v2/studies';

  trials = signal<any[]>([]);
  favorites = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchRandomTrials(): Observable<any> {
    const url = this.apiUrl;

    return this.http.get(url);
  }
}
