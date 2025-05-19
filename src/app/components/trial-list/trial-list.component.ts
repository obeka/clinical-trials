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
  trials = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  private timerSub: Subscription | null = null;

  constructor(
    private trialsService: TrialsService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadInitialTrials();
    this.startTimer();
  }

  loadInitialTrials() {
    this.loading.set(true);
    this.error.set(null);

    this.trialsService
      .fetchInitialTrials()
      .pipe(
        catchError((err) => {
          this.error.set('Failed to load trials');
          return of({ studies: [] });
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res: any) => {
        this.trials.set(res?.studies || []);
      });
  }

  startTimer() {
    this.timerSub = interval(5000).subscribe(() => {
      this.trialsService.fetchNextTrial().subscribe((res: any) => {
        const newTrial = res?.studies?.[0];
        if (!newTrial) return;

        const current = this.trials();
        const updated = [newTrial, ...current.slice(0, 9)];
        this.trials.set(updated);
      });
    });
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
