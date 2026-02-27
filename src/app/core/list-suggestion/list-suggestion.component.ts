import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchText = '';
  statusFilter: 'toutes' | 'acceptee' | 'refusee' | 'en_attente' = 'toutes';
  onlyFavorites = false;
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestionService.getSuggestionsFromApi().subscribe((data) => {
      this.suggestions = Array.isArray(data) ? data : [];
    });
  }

  likeSuggestion(s: Suggestion): void {
    this.suggestionService.updateNbLikes(s.id, s.nbLikes + 1).subscribe({
      next: (updated) => (s.nbLikes = updated.nbLikes),
      error: () => (s.nbLikes++)
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
