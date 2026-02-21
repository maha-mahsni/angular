import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  standalone: false,
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | null = null;
  suggestionId: number | null = null;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.suggestionId = +id;
        this.suggestion = this.suggestions.find(s => s.id === this.suggestionId) || null;
      }
    });
  }

  goBackToList() {
    this.router.navigate(['/suggestions']);
  }
}
