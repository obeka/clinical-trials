import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FavoritesService } from '../../services/favorites.service';
import { Study } from '../../models/trial.model'; // adjust the path if needed

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: Study[] = [];
  selected = signal<Set<string>>(new Set());

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  toggleSelection(trialId: string | undefined): void {
    if (!trialId) return;

    const current = new Set(this.selected());
    if (current.has(trialId)) {
      current.delete(trialId);
    } else {
      current.add(trialId);
    }
    this.selected.set(current);
  }

  removeFromFavorites(): void {
    this.favoritesService.removeFavorites(this.selected());
    this.selected.set(new Set());
    this.favorites = this.favoritesService.getFavorites();
  }
}
