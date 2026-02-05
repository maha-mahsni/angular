import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  searchText = '';
  statusFilter: 'toutes' | 'acceptee' | 'refusee' | 'en_attente' = 'toutes';
  onlyFavorites = false;
  favorites: Suggestion[] = [];

  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Amélioration de la gestion des réservations.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Mettre en place une boîte à idées',
      description: 'Créer un canal interne où chaque employé peut poster ses idées.',
      category: 'Organisation',
      date: new Date('2025-02-01'),
      status: 'en_attente',
      nbLikes: 3
    }
  ];

  likeSuggestion(s: Suggestion) {
    s.nbLikes++;
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
