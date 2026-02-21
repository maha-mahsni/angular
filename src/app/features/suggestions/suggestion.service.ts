import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  private suggestions: Suggestion[] = [
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

  getSuggestions(): Suggestion[] {
    return this.suggestions;
  }

  addSuggestion(suggestion: Omit<Suggestion, 'id' | 'nbLikes'>): Suggestion {
    const id = this.nextId();
    const newSuggestion: Suggestion = {
      ...suggestion,
      id,
      nbLikes: 0
    };
    this.suggestions.push(newSuggestion);
    return newSuggestion;
  }

  private nextId(): number {
    const ids = this.suggestions.map((s) => s.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
