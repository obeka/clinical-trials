import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../../services/favorites.service';
import { Study } from '../../models/trial.model';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesService: jest.Mocked<FavoritesService>;

  const mockStudy: Study = {
    protocolSection: {
      identificationModule: {
        nctId: 'NCT12345',
      },
    },
    hasResults: false,
    derivedSection: {
      miscInfoModule: {
        versionHolder: new Date(),
      },
    },
  } as Study;

  beforeEach(async () => {
    const serviceSpy = {
      getFavorites: jest.fn(),
      removeFavorites: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: FavoritesService, useValue: serviceSpy }],
    }).compileComponents();

    favoritesService = TestBed.inject(
      FavoritesService
    ) as jest.Mocked<FavoritesService>;
    favoritesService.getFavorites.mockReturnValue([mockStudy]);

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    expect(favoritesService.getFavorites).toHaveBeenCalled();
    expect(component.favorites.length).toBe(1);
  });

  it('should toggle selection correctly', () => {
    expect(component.selected().size).toBe(0);

    component.toggleSelection('NCT12345');
    expect(component.selected().size).toBe(1);
    expect(component.selected().has('NCT12345')).toBeTruthy();

    component.toggleSelection('NCT12345');
    expect(component.selected().size).toBe(0);
  });

  it('should remove selected favorites', () => {
    component.toggleSelection('NCT12345');
    component.removeFromFavorites();

    expect(favoritesService.removeFavorites).toHaveBeenCalledWith(
      new Set(['NCT12345'])
    );
    expect(favoritesService.getFavorites).toHaveBeenCalled();
    expect(component.selected().size).toBe(0);
  });
});
