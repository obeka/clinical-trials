import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Study } from '../models/trial.model';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add favorites', () => {
    const study: Study = {
      protocolSection: { identificationModule: { nctId: '123' } },
    } as Study;
    service.addFavorites([study]);
    expect(service.getFavorites()).toContain(study);
  });

  it('should remove a favorite by id', () => {
    const study: Study = {
      protocolSection: { identificationModule: { nctId: '123' } },
    } as Study;
    service.addFavorites([study]);
    service.removeFavorite('123');
    expect(service.getFavorites()).not.toContain(study);
  });

  it('should remove multiple favorites by ids', () => {
    const study1: Study = {
      protocolSection: { identificationModule: { nctId: '123' } },
    } as Study;
    const study2: Study = {
      protocolSection: { identificationModule: { nctId: '456' } },
    } as Study;
    service.addFavorites([study1, study2]);
    service.removeFavorites(new Set(['123', '456']));
    expect(service.getFavorites()).toEqual([]);
  });
});
