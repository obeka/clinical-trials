import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites = signal<any[]>([]);

  getFavorites() {
    return this.favorites();
  }

  addFavorites(items: any[]) {
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

  removeFavorite(id: string) {
    const filtered = this.favorites().filter(
      (item) => item.protocolSection?.identificationModule?.nctId !== id
    );
    this.favorites.set(filtered);
  }
}
