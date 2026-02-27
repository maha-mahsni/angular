import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  standalone: false,
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | null = null;
  suggestionId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.suggestionId = +id;
        this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
          next: (data) => (this.suggestion = data),
          error: () => {
            const list = this.suggestionService.getSuggestionList();
            this.suggestion = list.find((s) => s.id === this.suggestionId) || null;
          }
        });
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['/suggestions']);
  }

  goToEdit(): void {
    if (this.suggestion) {
      this.router.navigate(['/suggestions', 'edit', this.suggestion.id]);
    }
  }
}
