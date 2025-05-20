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

  removeFavorite(id: string): void {
    const filtered = this.favorites().filter(
      (item) => item.protocolSection?.identificationModule?.nctId !== id
    );
    this.favorites.set(filtered);
  }
}
