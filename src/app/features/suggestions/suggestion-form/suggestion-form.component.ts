import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: false,
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  form!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const dateStr = this.formatDate(today);

    this.form = this.fb.group({
      titre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[A-Z][a-zA-Z]*$/)
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      categorie: ['', Validators.required],
      date: [{ value: dateStr, disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  private formatDate(d: Date): string {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    const suggestion: Omit<Suggestion, 'id' | 'nbLikes'> = {
      title: raw.titre,
      description: raw.description,
      category: raw.categorie,
      date: new Date(),
      status: 'en_attente'
    };
    this.suggestionService.addSuggestion(suggestion);
    this.router.navigate(['/suggestions']);
  }
}
