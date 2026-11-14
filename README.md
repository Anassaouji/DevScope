# DevScope — Recherche et gestion de profils GitHub

**DevScope** est une application web destinée aux recruteurs tech. Elle permet de rechercher des développeurs sur GitHub, de consulter leurs profils et leurs dépôts publics, puis de constituer une shortlist de candidats centralisée.

Le projet met en pratique la consommation d'API REST avec JavaScript, la manipulation du DOM et la gestion des données à travers plusieurs pages.

## Fonctionnalités

### 🔎 Recherche de développeurs

- Recherche d'un développeur à partir de son nom d'utilisateur GitHub.
- Validation du nom d'utilisateur avant l'envoi de la requête.
- Redirection vers une page de profil dédiée.
- Affichage de messages explicites en cas de saisie invalide ou de profil introuvable.

### 👤 Consultation d'un profil GitHub

- Affichage de l'avatar, du nom, du login, de la biographie et de la localisation.
- Présentation de la date d'inscription, du nombre de dépôts publics, d'abonnés et d'abonnements.
- Accès direct au profil GitHub du développeur.
- Affichage des dépôts publics avec leur description, langage principal, étoiles, forks et date de mise à jour.
- Gestion des informations manquantes avec des valeurs par défaut.

### ⭐ Gestion de la shortlist

- Ajout d'un candidat depuis sa page de profil.
- Enregistrement des candidats dans une API REST MockAPI.
- Vérification des doublons avant l'ajout.
- Consultation de la liste des candidats et de leur nombre total.
- Recherche d'un candidat par nom ou par login.
- Tri des candidats par nom ou par date d'ajout.

### ⚙️ Expérience utilisateur

- Indicateurs de chargement pendant les appels API.
- Messages adaptés aux erreurs HTTP et aux problèmes de connexion.
- Interface responsive réalisée avec Tailwind CSS.
- Navigation commune entre les trois pages.

## Technologies utilisées

| Technologie | Utilisation |
| --- | --- |
| **HTML5** | Structure des pages |
| **Tailwind CSS** | Mise en forme et adaptation aux écrans |
| **JavaScript (ES6+)** | Logique applicative, modules et manipulation du DOM |
| **GitHub REST API** | Récupération des profils et dépôts publics |
| **MockAPI** | Stockage et récupération des candidats |
| **Git / GitHub** | Versionnement du projet |
| **Jira** | Organisation et suivi des tâches |

## Pages de l'application

| Page | Fichier | Description |
| --- | --- | --- |
| **Recherche** | `index.html` | Recherche et validation d'un nom d'utilisateur GitHub |
| **Profil** | `profil.html?username=...` | Informations du développeur, dépôts et ajout à la shortlist |
| **Shortlist** | `shortlist.html` | Liste, recherche et tri des candidats enregistrés |

## Fonctionnement des API

L'application communique avec deux services :

**GitHub REST API**

- `GET https://api.github.com/users/{username}` : récupération d'un profil.
- `GET https://api.github.com/users/{username}/repos` : récupération de ses dépôts publics.

**MockAPI**

- `GET /candidats` : récupération de la shortlist.
- `POST /candidats` : enregistrement d'un candidat au format JSON.

Les requêtes sont réalisées avec `fetch`, `async/await` et une vérification de `response.ok`. Les erreurs sont traitées avec `try/catch`, et les réponses JSON sont utilisées pour générer les éléments de l'interface avec le DOM.

## Organisation du code

Le code JavaScript est organisé en **modules ES6** (`import` / `export`), afin de séparer :

- les appels aux API et la gestion des réponses ;
- la validation et la recherche des utilisateurs ;
- l'affichage des profils et de leurs dépôts ;
- la gestion et l'affichage de la shortlist.

Cette organisation facilite la lecture, la maintenance et la réutilisation du code.

## Installation et utilisation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/VOTRE-UTILISATEUR/DevScope.git
   ```

2. Accéder au dossier :

   ```bash
   cd DevScope
   ```

3. Configurer, si nécessaire, les adresses d'API dans les fichiers de configuration du projet.
4. Ouvrir `index.html` avec un serveur local, par exemple l'extension **Live Server** de Visual Studio Code.
5. Rechercher un nom d'utilisateur GitHub et consulter son profil.

> **Sécurité :** ne publiez jamais de token GitHub personnel ni de secret dans le dépôt. Pour un déploiement purement front-end, les identifiants secrets doivent être gérés côté serveur, et non dans le JavaScript accessible au navigateur.

## Démonstration

- **Application en ligne :** ajouter ici l'URL GitHub Pages.
- **Code source :** ajouter ici l'URL du dépôt GitHub.

## Auteur

**Anass Aouji** — Développement front-end

Projet individuel réalisé dans le cadre d'un brief pédagogique consacré à la connexion d'une application web à des services et données externes.
