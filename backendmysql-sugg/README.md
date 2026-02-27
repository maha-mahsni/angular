# Backend Suggestions API (Workshop 5)

API Express.js + MySQL pour le projet Angular Suggestions.

## Prérequis

- **Node.js** (v18+)
- **XAMPP** (Apache + MySQL) ou MySQL installé
- Base de données **suggestions_db** créée dans MySQL

## Configuration

1. **Créer la base de données**  
   Dans phpMyAdmin (`http://localhost/phpmyadmin`) : créer une base nommée **suggestions_db**.

2. **Table**  
   La table `suggestions` est créée automatiquement au démarrage du serveur (voir `config/database.js`).  
   Vous pouvez aussi exécuter le script SQL à la racine du projet Angular : `workshop5-database.sql`.

3. **Variables d'environnement**  
   Le fichier `.env` est déjà configuré avec les valeurs par défaut (XAMPP) :
   - `DB_HOST=localhost`
   - `DB_PORT=3306`
   - `DB_USER=root`
   - `DB_PASSWORD=` (vide par défaut)
   - `DB_NAME=suggestions_db`
   - `PORT=3000`

   Pour un autre environnement, copier `.env.example` vers `.env` et modifier les valeurs.

## Installation et lancement

```bash
# Dépendances (déjà installées si vous avez suivi le workshop)
npm install

# Démarrer le serveur (mode développement avec rechargement)
npm run dev
```

Le serveur écoute sur **http://localhost:3000/suggestions**.

## Endpoints

| Méthode | URL | Description |
|--------|-----|-------------|
| GET | /suggestions | Liste des suggestions |
| GET | /suggestions/:id | Une suggestion par ID |
| POST | /suggestions | Créer une suggestion |
| PUT | /suggestions/:id | Mettre à jour une suggestion |
| PATCH | /suggestions/:id | Mise à jour partielle (ex: nbLikes) |
| DELETE | /suggestions/:id | Supprimer une suggestion |
| POST | /suggestions/:id/like | Incrémenter les likes |

## Lancer le frontend Angular

Depuis la racine du projet Angular :

```bash
ng serve
```

Puis ouvrir http://localhost:4200 et aller sur la section Suggestions.
