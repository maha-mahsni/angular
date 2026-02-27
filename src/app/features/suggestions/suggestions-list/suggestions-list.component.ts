import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestions-list',
  standalone: false,
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.css']
})
export class SuggestionsListComponent implements OnInit {
  searchText = '';
  statusFilter: 'toutes' | 'acceptee' | 'refusee' | 'en_attente' = 'toutes';
  onlyFavorites = false;
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsFromApi().subscribe((data) => {
      this.suggestions = Array.isArray(data) ? data : [];
    });
  }

  likeSuggestion(s: Suggestion): void {
    this.suggestionService.updateNbLikes(s.id, s.nbLikes + 1).subscribe({
      next: (updated) => {
        s.nbLikes = updated.nbLikes;
      },
      error: () => {
        s.nbLikes++;
      }
    });
  }

  deleteSuggestion(s: Suggestion): void {
    if (!confirm(`Supprimer la suggestion « ${s.title } » ?`)) return;
    this.suggestionService.deleteSuggestion(s.id).subscribe({
      next: () => this.loadSuggestions(),
      error: () => this.loadSuggestions()
    });
  }

  toggleFavorite(s: Suggestion) {
    const index = this.favorites.indexOf(s);
    if (index === -1) {
      this.favorites.push(s);
    } else {
      this.favorites.splice(index, 1);
    }
  }

  isFavorite(s: Suggestion) {
    return this.favorites.includes(s);
  }

  filteredSuggestions() {
    return this.suggestions.filter((s) => {
      const search = this.searchText.toLowerCase();
      const matchesText =
        !search ||
        s.title.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.category.toLowerCase().includes(search);

      const matchesStatus =
        this.statusFilter === 'toutes' ? true : s.status === this.statusFilter;

      const matchesFavorites = this.onlyFavorites ? this.isFavorite(s) : true;

      return matchesText && matchesStatus && matchesFavorites;
    });
  }

  trackById(_index: number, item: Suggestion) {
    return item.id;
  }

  get totalLikes(): number {
    return this.suggestions.reduce((sum, s) => sum + s.nbLikes, 0);
  }
}
