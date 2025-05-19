import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { TrialsService } from '../../services/trial.service';

@Component({
  selector: 'app-trial-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './trial-list.component.html',
  styleUrl: './trial-list.component.scss',
})
export class TrialListComponent implements OnInit {
  trials = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private trialsService: TrialsService) {}

  ngOnInit(): void {
    this.loadInitialTrials();
  }

  loadInitialTrials() {
    this.loading.set(true);
    this.error.set(null);

    this.trialsService
      .fetchRandomTrials()
      .pipe(
        catchError((err) => {
          this.error.set('Failed to load trials');
          return of({ studies: [] });
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res: any) => {
        const items = res?.studies || [];
        console.log('Fetched trials:', items);
        this.trials.set(items);
      });
  }
}
