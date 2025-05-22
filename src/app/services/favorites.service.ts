import { Injectable, signal } from '@angular/core';
import { Study } from '../models/trial.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites = signal<Study[]>([]);

  getFavorites(): Study[] {
    return this.favorites();
  }

  addFavorites(items: Study[]): void {
    const current = this.favorites();
    // Only add items that are not already in favorites
    const added = items.filter(
      (item) =>
        !current.some(
          (f) =>
            f.protocolSection?.identificationModule?.nctId ===
            item.protocolSection?.identificationModule?.nctId
        )
    );
    this.favorites.set([...current, ...added]);
  }

  removeFavorites(ids: Set<string>): void {
    const filtered = this.favorites().filter((item) => {
      const nctId = item.protocolSection?.identificationModule?.nctId || '';
      return !ids.has(nctId);
    });
    this.favorites.set(filtered);
  }
}
