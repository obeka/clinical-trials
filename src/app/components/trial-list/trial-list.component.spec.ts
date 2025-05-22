import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  discardPeriodicTasks,
} from '@angular/core/testing';
import { TrialListComponent } from './trial-list.component';
import { TrialsService } from '../../services/trial.service';
import { FavoritesService } from '../../services/favorites.service';
import { of, throwError, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { signal } from '@angular/core';
import { Study } from '../../models/trial.model';

describe('TrialListComponent', () => {
  let component: TrialListComponent;
  let fixture: ComponentFixture<TrialListComponent>;
  let trialsServiceMock: Partial<TrialsService>;
  let favoritesServiceMock: Partial<FavoritesService>;

  const mockTrials = [
    {
      protocolSection: {
        identificationModule: {
          nctId: 'NCT0001',
          briefTitle: 'Trial 1',
        },
        statusModule: {
          overallStatus: 'Recruiting',
          startDateStruct: { date: '2024-01-01' },
        },
        conditionsModule: {
          conditions: ['Condition 1', 'Condition 2'],
        },
        designModule: {
          phases: ['Phase 1'],
        },
        sponsorCollaboratorsModule: {
          leadSponsor: { name: 'Sponsor 1' },
        },
      },
    },
    {
      protocolSection: {
        identificationModule: {
          nctId: 'NCT0002',
          briefTitle: 'Trial 2',
        },
        statusModule: {
          overallStatus: 'Completed',
          startDateStruct: { date: '2023-01-01' },
        },
        conditionsModule: {
          conditions: ['Condition 3'],
        },
        designModule: {
          phases: ['Phase 2'],
        },
        sponsorCollaboratorsModule: {
          leadSponsor: { name: 'Sponsor 2' },
        },
      },
    },
  ] as Study[];

  beforeEach(async () => {
    // mock services
    trialsServiceMock = {
      trials: signal(mockTrials),
      fetchInitialTrials: jest
        .fn()
        .mockReturnValue(of({ studies: mockTrials })),
      fetchNextTrial: jest
        .fn()
        .mockReturnValue(of({ studies: [mockTrials[0]] })),
    };

    favoritesServiceMock = {
      addFavorites: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        TrialListComponent,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
      ],
      providers: [
        { provide: TrialsService, useValue: trialsServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrialListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with trials from service', () => {
    fixture.detectChanges();
    expect(component.trials()).toEqual(mockTrials);
  });

  it('should fetch initial trials if array is empty', () => {
    // Reset trials to empty
    trialsServiceMock.trials = signal([]);
    component.trials = trialsServiceMock.trials;

    fixture.detectChanges();

    expect(trialsServiceMock.fetchInitialTrials).toHaveBeenCalled();
    expect(component.loading()).toBeFalsy(); // Should be false after finalization
  });

  it('should not fetch trials if trials already exist', () => {
    // Initialize component with non-empty trials
    fixture.detectChanges();

    // Fetch should not be called
    expect(trialsServiceMock.fetchInitialTrials).not.toHaveBeenCalled();
  });

  it('should toggle selection correctly', () => {
    fixture.detectChanges();

    const trialId = 'NCT0001';

    // Initially no selections
    expect(component.selected().size).toBe(0);

    component.toggleSelection(trialId);
    expect(component.selected().has(trialId)).toBeTruthy();
    expect(component.selected().size).toBe(1);

    // Toggle again to deselect
    component.toggleSelection(trialId);
    expect(component.selected().has(trialId)).toBeFalsy();
    expect(component.selected().size).toBe(0);
  });

  it('should add selected trials to favorites', () => {
    fixture.detectChanges();

    component.toggleSelection('NCT0001');

    component.addToFavorites();

    // Check that favorites service was called with correct trial
    expect(favoritesServiceMock.addFavorites).toHaveBeenCalledWith([
      mockTrials[0],
    ]);

    expect(component.selected().size).toBe(0);
  });

  it('should handle error when fetching trials fails', fakeAsync(() => {
    trialsServiceMock.trials = signal([]);
    component.trials = trialsServiceMock.trials;

    // return an error
    (trialsServiceMock.fetchInitialTrials as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('Error fetching trials'))
    );

    fixture.detectChanges();
    tick();

    expect(component.error()).toBe('Failed to load trials');
  }));

  it('should unsubscribe from timer on destroy', fakeAsync(() => {
    fixture.detectChanges();

    const mockUnsubscribe = jest.fn();
    component['timerSub'] = {
      unsubscribe: mockUnsubscribe,
    } as unknown as Subscription;

    component.ngOnDestroy();

    // Check that unsubscribe was called
    expect(mockUnsubscribe).toHaveBeenCalled();

    discardPeriodicTasks();
  }));

  it('should toggle timer state correctly', fakeAsync(() => {
    fixture.detectChanges();

    expect(component.timerActive()).toBeTruthy();

    // Toggle timer off
    component.toggleTimer();
    expect(component.timerActive()).toBeFalsy();

    // Toggle timer back on
    component.toggleTimer();
    expect(component.timerActive()).toBeTruthy();

    discardPeriodicTasks();
  }));
});
