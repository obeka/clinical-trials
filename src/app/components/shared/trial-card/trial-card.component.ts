import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Study } from '../../../models/trial.model';

@Component({
  selector: 'app-trial-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './trial-card.component.html',
  styleUrl: './trial-card.component.scss',
})
export class TrialCardComponent {
  @Input() trial!: Study;
  @Input() isSelected = false;

  @Output() selectionChange = new EventEmitter<string>();

  toggleSelection() {
    const id = this.trial.protocolSection?.identificationModule?.nctId || '';
    this.selectionChange.emit(id);
  }
}
