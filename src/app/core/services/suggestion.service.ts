import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  suggestionUrl = 'http://localhost:3000/suggestions';

  private suggestionList: Suggestion[] = [
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

  constructor(private http: HttpClient) {}

  /** Partie 1 - Étape 2 : Retourne la liste des suggestions (source locale). */
  getSuggestionList(): Suggestion[] {
    return this.suggestionList;
  }

  /** Partie 2 - Récupère la liste des suggestions depuis l'API (Observable). */
  getSuggestionsFromApi(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl).pipe(
      catchError(() => of(this.suggestionList))
    );
  }

  /** Instruction 6 : Retourne une suggestion par son id (API). */
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  /** Instruction 8 : Supprime une suggestion. */
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  /** Instruction 10 : Ajoute une nouvelle suggestion. */
  addSuggestion(suggestion: Omit<Suggestion, 'id' | 'nbLikes'>): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  /** Instruction 12 : Met à jour une suggestion. */
  updateSuggestion(id: number, suggestion: Partial<Suggestion>): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  /** Instruction 15 : Met à jour le nombre de likes. */
  updateNbLikes(id: number, nbLikes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { nbLikes });
  }
}
