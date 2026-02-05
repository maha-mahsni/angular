// Modèle partagé pour une suggestion affichée dans l'application.
export interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  status: 'acceptee' | 'refusee' | 'en_attente';
  nbLikes: number;
}
