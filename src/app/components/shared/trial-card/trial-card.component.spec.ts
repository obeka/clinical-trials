import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrialCardComponent } from './trial-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Study } from '../../../models/trial.model';
import { By } from '@angular/platform-browser';
import { spyOn } from 'jest-mock';

describe('TrialCardComponent', () => {
  let component: TrialCardComponent;
  let fixture: ComponentFixture<TrialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatCheckboxModule, TrialCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrialCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display trial details', () => {
    const trial: Study = {
      protocolSection: {
        identificationModule: {
          nctId: '123',
        },
      },
    } as Study;
    component.trial = trial;
    fixture.detectChanges();

    const cardTitle = fixture.debugElement.query(By.css('mat-card-title'));
    expect(cardTitle).toBeTruthy();
  });

  it('should emit selectionChange on toggleSelection', () => {
    const trial: Study = {
      protocolSection: {
        identificationModule: {
          nctId: '123',
        },
      },
    } as Study;
    component.trial = trial;
    spyOn(component.selectionChange, 'emit');

    component.toggleSelection();

    expect(component.selectionChange.emit).toHaveBeenCalledWith('123');
  });
});
