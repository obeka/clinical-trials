import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FavoritesService } from '../../services/favorites.service';
import { Study } from '../../models/trial.model'; // adjust the path if needed

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: Study[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }
}
