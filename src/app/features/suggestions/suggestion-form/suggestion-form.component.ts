import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: false,
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  form!: FormGroup;
  id: number | null = null;
  isEditMode = false;

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
    private router: Router,
    private actR: ActivatedRoute
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

    this.id = +this.actR.snapshot.params['id'];
    if (this.id && !isNaN(this.id)) {
      this.isEditMode = true;
      this.suggestionService.getSuggestionById(this.id).subscribe({
        next: (data) => {
          const suggestion = this.normalizeSuggestion(data);
          this.form.patchValue({
            titre: suggestion.title,
            description: suggestion.description,
            categorie: suggestion.category,
            date: this.formatDate(new Date(suggestion.date)),
            status: suggestion.status
          });
        },
        error: () => {
          const list = this.suggestionService.getSuggestionList();
          const suggestion = list.find((s) => s.id === this.id);
          if (suggestion) {
            this.form.patchValue({
              titre: suggestion.title,
              description: suggestion.description,
              categorie: suggestion.category,
              date: this.formatDate(new Date(suggestion.date)),
              status: suggestion.status
            });
          }
        }
      });
    }
  }

  private normalizeSuggestion(data: Suggestion | Record<string, unknown>): Suggestion {
    const d = data as Record<string, unknown>;
    const statusRaw = String(d['status'] ?? 'en_attente');
    const statusMap: Record<string, Suggestion['status']> = {
      'en attente': 'en_attente',
      'en_attente': 'en_attente',
      'acceptee': 'acceptee',
      'refusee': 'refusee'
    };
    const status = statusMap[statusRaw] ?? 'en_attente';
    return {
      id: Number(d['id']),
      title: String(d['title'] ?? ''),
      description: String(d['description'] ?? ''),
      category: String(d['category'] ?? ''),
      date: d['date'] instanceof Date ? d['date'] : new Date(String(d['date'])),
      status,
      nbLikes: Number(d['nbLikes'] ?? 0)
    };
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

    if (this.isEditMode && this.id != null) {
      const suggestion: Partial<Suggestion> = {
        title: raw.titre,
        description: raw.description,
        category: raw.categorie,
        date: new Date(),
        status: raw.status || 'en_attente'
      };
      this.suggestionService.updateSuggestion(this.id, suggestion).subscribe({
        next: () => this.router.navigate(['/suggestions']),
        error: () => this.router.navigate(['/suggestions'])
      });
    } else {
      const suggestion: Omit<Suggestion, 'id' | 'nbLikes'> = {
        title: raw.titre,
        description: raw.description,
        category: raw.categorie,
        date: new Date(),
        status: 'en_attente'
      };
      this.suggestionService.addSuggestion(suggestion).subscribe({
        next: () => this.router.navigate(['/suggestions']),
        error: () => this.router.navigate(['/suggestions'])
      });
    }
  }
}
