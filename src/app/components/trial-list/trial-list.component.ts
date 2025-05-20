import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TrialsService } from '../../services/trial.service';
import { catchError, finalize } from 'rxjs/operators';
import { of, interval, Subscription } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-trial-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './trial-list.component.html',
  styleUrl: './trial-list.component.scss',
})
export class TrialListComponent implements OnInit, OnDestroy {
  trials;

  loading = signal(false);
  error = signal<string | null>(null);
  countdown = signal(5);
  private timerSub: Subscription | null = null;

  constructor(
    private trialsService: TrialsService,
    private favoritesService: FavoritesService
  ) {
    this.trials = this.trialsService.trials;
  }

  ngOnInit(): void {
    this.error.set(null);
    if (this.trials().length === 0) {
      this.loading.set(true);
      this.trialsService
        .fetchInitialTrials()
        .pipe(
          catchError(() => {
            this.error.set('Failed to load trials');
            return of({ studies: [] });
          }),
          finalize(() => this.loading.set(false))
        )
        .subscribe(() => {
          this.startTimer();
        });
    } else {
      // Trials already in memory, just resume timer
      this.startTimer();
    }
  }

  startTimer() {
    this.countdown.set(5);

    const totalInterval = interval(1000).subscribe(() => {
      const current = this.countdown();
      if (current > 1) {
        this.countdown.set(current - 1);
      } else {
        this.countdown.set(5);
        this.trialsService.fetchNextTrial().subscribe();
      }
    });

    this.timerSub = totalInterval;
  }

  selected = signal<Set<string>>(new Set());

  toggleSelection(trialId: string) {
    const current = new Set(this.selected());
    if (current.has(trialId)) {
      current.delete(trialId);
    } else {
      current.add(trialId);
    }
    this.selected.set(current);
  }

  addToFavorites() {
    const selectedIds = this.selected();
    const selectedTrials = this.trials().filter((trial) =>
      selectedIds.has(trial.protocolSection?.identificationModule?.nctId)
    );
    this.favoritesService.addFavorites(selectedTrials);
    this.selected.set(new Set());
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }
}
