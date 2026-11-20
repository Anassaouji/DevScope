# DevScope v2 — GitHub Talent Discovery & Recruitment Management

**Application web de recherche, d'analyse et de gestion de profils de développeurs GitHub.**

DevScope est une application web destinée aux recruteurs techniques. Elle centralise la recherche de développeurs, l'exploration de leurs projets GitHub et le suivi des candidatures au sein d'une shortlist.

Développée en **HTML5, Tailwind CSS et JavaScript ES6+**, l'application exploite la **GitHub REST API** pour consulter les profils et dépôts publics, ainsi que **MockAPI** pour gérer les candidats.

La version 2 enrichit l'application avec la modification et la suppression des candidats, la recherche et le filtrage des dépôts, et un système de cache local permettant d'optimiser les appels à l'API GitHub.

## Liens du projet

- **Application en ligne :** [DevScope — Live Demo](https://devscope-blue.vercel.app/)
- **Dépôt GitHub :** [Anassaouji/DevScope](https://github.com/Anassaouji/DevScope)
- **Gestion de projet :** [Tableau Jira](https://aoujianass.atlassian.net/jira/software/projects/DEV/boards/37/)
- **Présentation :** [DevScope — Canva](https://canva.link/66agytw96fovbwv)

## 1. Contexte et problématique

Dans le secteur du recrutement informatique, les recruteurs doivent régulièrement rechercher des développeurs, analyser leurs réalisations et suivre l'évolution de leurs candidatures.

Ces opérations deviennent rapidement chronophages lorsque les informations sont dispersées entre GitHub et différents outils de suivi.

**DevScope répond à trois besoins principaux :**

1. **Découvrir :** rechercher des développeurs et consulter leurs profils GitHub.
2. **Analyser :** explorer leurs dépôts publics à l'aide de critères de recherche et de filtrage.
3. **Organiser :** centraliser les candidats et suivre leur progression dans le processus de recrutement.

### Pourquoi une version 2 ?

La première version permettait de rechercher des développeurs, d'afficher leurs dépôts et de créer une shortlist.

Cependant, plusieurs limites subsistaient :

- Impossibilité de modifier ou de supprimer un candidat.
- Navigation difficile dans les profils possédant de nombreux dépôts.
- Requêtes GitHub répétées pour des profils déjà consultés.
- Absence de suivi détaillé du statut et de l'évaluation des candidats.

**DevScope v2 apporte des solutions à ces limites sans supprimer les fonctionnalités de la version initiale.**

## 2. Fonctionnalités

### Recherche de développeurs

- Recherche d'un développeur par son nom d'utilisateur GitHub.
- Validation de la saisie avant l'envoi de la requête.
- Récupération des informations publiques depuis l'API GitHub.
- Redirection vers une page de profil dédiée.
- Gestion des utilisateurs introuvables et des erreurs de requête.

### Consultation des profils GitHub

Chaque profil présente les informations publiques disponibles :

- Avatar, nom, identifiant GitHub et biographie.
- Localisation et date d'inscription.
- Nombre de dépôts publics.
- Nombre d'abonnés et d'abonnements.
- Lien direct vers le compte GitHub.
- Liste des dépôts publics avec leurs informations principales.

Chaque dépôt peut afficher son nom, sa description, son langage principal, son nombre d'étoiles, ses forks et sa dernière date de mise à jour.

Les informations absentes sont gérées à l'aide de valeurs par défaut pour maintenir une interface cohérente.

### Recherche et filtrage des dépôts — v2

La page Profil intègre deux outils complémentaires :

- **Recherche dynamique :** filtrage des dépôts selon leur nom.
- **Filtre par langage :** sélection d'un langage de programmation dans une liste générée à partir des dépôts disponibles.

Les deux critères peuvent être combinés pour affiner les résultats.

Le traitement est effectué **côté navigateur avec `Array.filter()`**, sans effectuer de nouvelle requête API à chaque recherche.

Lorsqu'aucun dépôt ne correspond aux critères sélectionnés, un message explicite est affiché.

### Gestion de la shortlist

La shortlist permet aux recruteurs de conserver et d'organiser les profils sélectionnés.

**Fonctionnalités de la version initiale :**

- Ajout d'un candidat depuis sa page de profil.
- Enregistrement des candidats dans MockAPI.
- Vérification des doublons avant l'ajout.
- Affichage des candidats enregistrés.
- Recherche par nom ou identifiant GitHub.
- Tri par nom ou par date d'ajout.
- Affichage du nombre total de candidats.

**Nouveautés de DevScope v2 :**

**Modification d'un candidat**

Chaque candidat dispose d'un bouton « Modifier » ouvrant une fenêtre permettant de renseigner :

- Son statut : À contacter, Entretien, Retenu ou Refusé.
- Une note de 1 à 5.
- Un commentaire de suivi.

Les changements sont enregistrés dans MockAPI avec une requête HTTP `PUT`.

Après validation, les informations de la carte sont actualisées **sans rechargement de la page**.

**Suppression d'un candidat**

- Bouton « Supprimer » sur chaque carte.
- Demande de confirmation avant la suppression.
- Suppression des données avec une requête HTTP `DELETE`.
- Actualisation immédiate de la liste et du compteur.

**Gestion des états de l'interface**

- Désactivation des boutons pendant les opérations asynchrones.
- Prévention des soumissions multiples.
- Messages d'erreur explicites en cas d'échec.
- Gestion des erreurs réseau et des réponses HTTP non valides.

### Optimisation des performances — v2

Pour limiter les requêtes répétitives vers l'API GitHub, DevScope dispose d'un système de cache utilisant `localStorage`.

**Principe de fonctionnement :**

1. Lorsqu'un profil est demandé, l'application vérifie si ses données sont présentes dans le cache.
2. Si les données existent et datent de moins de 10 minutes, elles sont récupérées directement depuis le navigateur.
3. Si les données sont absentes ou expirées, une nouvelle récupération est effectuée depuis l'API GitHub.
4. Les informations obtenues sont enregistrées dans le cache avec une durée de validité.

Les données sont sérialisées avec `JSON.stringify()` et désérialisées avec `JSON.parse()`.

Le chargement du profil et de ses dépôts est réalisé en parallèle avec **`Promise.all()`**, afin d'éviter deux requêtes successives inutilement dépendantes.

Cette approche permet de :

- Réduire le nombre d'appels à l'API GitHub.
- Accélérer l'affichage des profils déjà consultés.
- Limiter les risques d'atteindre le quota de requêtes de l'API.
- Améliorer l'expérience utilisateur.

## 3. Technologies utilisées

| Technologie | Rôle |
|---|---|
| HTML5 | Structure sémantique des pages |
| Tailwind CSS | Interface responsive et composants visuels |
| JavaScript ES6+ | Logique métier, DOM et modules |
| GitHub REST API | Récupération des profils et dépôts |
| MockAPI | Persistance et gestion des candidats |
| Fetch API | Communication HTTP asynchrone |
| LocalStorage | Mise en cache temporaire des données |
| Git & GitHub | Versionnement et gestion du code source |
| Jira | Planification Agile et suivi des tâches |
| Vercel | Hébergement et déploiement de l'application |

## 4. Architecture du projet

L'application repose sur une architecture modulaire utilisant les modules JavaScript ES6 (`import` / `export`).

```text
DevScope/
│
├── index.html
├── profil.html
├── shortlist.html
│
├── js/
│   ├── config.js
│   ├── api.js
│   ├── cache.js
│   ├── utils.js
│   ├── states.js
│   ├── search.js
│   ├── profil.js
│   └── shortlist.js
│
├── README.md
└── .gitignore
```

### Responsabilité des modules

| Module | Responsabilité |
|---|---|
| `config.js` | Configuration des API, statuts et paramètres |
| `api.js` | Centralisation des appels HTTP |
| `cache.js` | Lecture, écriture et expiration du cache |
| `utils.js` | Fonctions utilitaires et validation |
| `states.js` | Gestion des états de l'application |
| `search.js` | Logique de recherche des développeurs |
| `profil.js` | Affichage du profil, des dépôts et filtres |
| `shortlist.js` | Affichage et gestion des candidats |

Cette séparation permet de limiter les responsabilités de chaque fichier, d'améliorer la maintenance et de faciliter les évolutions futures.

## 5. Fonctionnement des API

### GitHub REST API

L'application utilise les endpoints publics de GitHub :

```http
GET https://api.github.com/users/{username}
GET https://api.github.com/users/{username}/repos
```

Ces endpoints permettent de récupérer les informations d'un développeur et ses dépôts publics.

Les deux ressources peuvent être chargées en parallèle avec `Promise.all()`.

Les réponses HTTP sont contrôlées pour gérer les situations telles que :

- `200 OK` : requête réussie.
- `403 Forbidden` : accès refusé ou limitation de l'API.
- `404 Not Found` : utilisateur introuvable.
- `429 Too Many Requests` : trop de requêtes.
- Erreur réseau : absence de connexion ou problème de communication.

### MockAPI — Gestion des candidats

MockAPI fournit une API REST pour conserver les candidats de la shortlist.

| Méthode | Endpoint | Fonction |
|---|---|---|
| GET | `/candidats` | Récupérer les candidats |
| POST | `/candidats` | Ajouter un candidat |
| PUT | `/candidats/:id` | Modifier un candidat |
| DELETE | `/candidats/:id` | Supprimer un candidat |

**Exemple de données d'un candidat :**

```json
{
  "id": "1",
  "login": "developer123",
  "name": "Developer Example",
  "avatar_url": "https://github.com/identicons/developer123.png",
  "html_url": "https://github.com/developer123",
  "language": "JavaScript",
  "rating": 4,
  "status": "Entretien",
  "note": "Bon profil frontend",
  "createdAt": "2026-11-16T10:00:00.000Z"
}
```

### Communication asynchrone

Les opérations réseau reposent sur :

- `fetch()` pour envoyer les requêtes HTTP.
- `async / await` pour gérer les traitements asynchrones.
- `try / catch` pour intercepter les erreurs.
- `response.ok` pour vérifier les réponses HTTP.
- `JSON.stringify()` pour transmettre les données JSON.

Pour les requêtes `PUT`, l'en-tête `Content-Type: application/json` est utilisé.

## 6. Gestion du cache

Le module `cache.js` centralise la gestion des données mises en cache.

**Durée de validité : 10 minutes.**

Les entrées sont associées à une information temporelle permettant de déterminer si elles sont encore valides.

| Situation | Comportement |
|---|---|
| Première consultation | Chargement depuis GitHub |
| Nouvelle consultation avant 10 min | Lecture depuis `localStorage` |
| Cache expiré | Nouvelle récupération depuis GitHub |
| Données absentes | Requête API |
| Données invalides | Nouvelle récupération après gestion du cache invalide |

Le cache concerne les données publiques des profils GitHub et leurs dépôts, et ne remplace pas la persistance des candidats effectuée par MockAPI.

## 7. Interface et expérience utilisateur

DevScope propose une interface conçue pour faciliter les opérations courantes des recruteurs.

- Design responsive avec Tailwind CSS.
- Navigation commune entre les différentes pages.
- Cartes de présentation des développeurs et candidats.
- Fenêtres modales pour les opérations de modification et de suppression.
- Indicateurs d'état pendant les opérations asynchrones.
- Messages de validation, de chargement et d'erreur.
- Champs de formulaire associés à des labels.
- Interface adaptée à différents formats d'écran.

Les données externes sont insérées dans le DOM avec `createElement()` et `textContent`, afin de limiter les risques liés à l'injection de contenu HTML.

## 8. Organisation et suivi du projet

DevScope v2 a été développé dans le cadre d'un projet individuel organisé avec Jira.

**Méthodologie :** gestion des tâches à travers une epic, des user stories et des sous-tâches.

Le développement de la v2 s'effectue dans le même dépôt GitHub que la première version.

Le tag Git `v1.0` permet d'identifier la version initiale, tandis que les messages de commit font référence aux tickets Jira.

**Principales étapes du développement :**

| Étape | Réalisation |
|---|---|
| Version 1 | Recherche GitHub, profil et shortlist |
| Évolution des dépôts | Recherche et filtrage combinés |
| Gestion des candidats | Modification avec PUT |
| Gestion des candidats | Suppression avec DELETE |
| Performance | Cache local avec expiration |
| Optimisation | Chargement parallèle avec Promise.all |
| Finalisation | Tests, documentation et déploiement |

La planification est consultable depuis le [tableau Jira](https://aoujianass.atlassian.net/jira/software/projects/DEV/boards/37/).

## 9. Installation et exécution

### Prérequis

- Un navigateur web moderne.
- Git.
- Visual Studio Code ou un autre éditeur.
- Un serveur de développement local, par exemple Live Server.
- Une connexion Internet pour accéder aux API externes.

### Étape 1 — Cloner le dépôt

```bash
git clone https://github.com/Anassaouji/DevScope.git
```

### Étape 2 — Accéder au projet

```bash
cd DevScope
```

### Étape 3 — Configurer l'application

Vérifier les adresses des API et les paramètres disponibles dans le module de configuration.

### Étape 4 — Lancer l'application

Ouvrir `index.html` à l'aide de Live Server dans Visual Studio Code.

### Étape 5 — Utiliser DevScope

1. Rechercher un développeur GitHub.
2. Consulter son profil et ses dépôts.
3. Utiliser les filtres pour explorer ses projets.
4. Ajouter un profil intéressant à la shortlist.
5. Modifier son statut, sa note ou son commentaire.
6. Supprimer un candidat si nécessaire.
7. Reconsulter un profil pour bénéficier du cache local.

## 10. Sécurité et bonnes pratiques

Le projet applique plusieurs principes de développement frontend :

- Validation des données saisies par l'utilisateur.
- Gestion des erreurs HTTP et des erreurs réseau.
- Contrôle des réponses avant leur exploitation.
- Désactivation des boutons pendant les requêtes.
- Séparation du code en modules réutilisables.
- Utilisation de `textContent` pour afficher les données externes.
- Vérification des données enregistrées dans le cache.

**Gestion des tokens GitHub :**

Les tokens personnels et autres secrets ne doivent jamais être publiés dans le dépôt GitHub.

Une application frontend statique ne peut pas garantir la confidentialité d'un token intégré à son JavaScript, même si celui-ci est fourni au moment du déploiement.

Pour protéger un secret en production, les requêtes nécessitant une authentification doivent passer par un service backend sécurisé.

## 11. Tests et validation

Les principaux scénarios à vérifier sont :

**Recherche et profils**
- Recherche avec un nom d'utilisateur valide.
- Recherche avec un nom invalide ou inexistant.
- Gestion des réponses HTTP en erreur.
- Affichage des données facultatives manquantes.

**Dépôts**
- Recherche par nom.
- Filtre par langage.
- Combinaison recherche + filtre.
- Affichage d'un message en cas de résultat vide.

**Shortlist**
- Ajout et détection des doublons.
- Modification du statut, de la note et du commentaire.
- Mise à jour immédiate de la carte.
- Confirmation avant suppression.
- Actualisation de la liste et du compteur.
- Gestion des erreurs pendant les opérations.

**Cache**
- Consultation initiale d'un profil.
- Reconsultation avant 10 minutes.
- Expiration du cache après 10 minutes.
- Contrôle des requêtes dans l'onglet Network des DevTools.

**Qualité**
- Vérification du responsive.
- Vérification de l'accessibilité des formulaires et modales.
- Validation HTML avec [W3C Validator](https://validator.w3.org/).

## 12. Compétences mises en pratique

Ce projet permet de mettre en œuvre plusieurs compétences fondamentales du développement frontend :

- Consommation et intégration d'API REST.
- Manipulation dynamique du DOM.
- JavaScript ES6+ et programmation asynchrone.
- Requêtes HTTP CRUD avec `fetch`.
- Gestion des promesses avec `Promise.all`.
- Filtrage dynamique avec les méthodes de tableaux.
- Gestion du stockage local et de l'expiration des données.
- Traitement des erreurs et états de chargement.
- Structuration du code en modules ES6.
- Versionnement Git et organisation du travail avec Jira.
- Déploiement d'une application web statique.

## 13. Perspectives d'amélioration

Plusieurs évolutions peuvent être envisagées :

- Filtrage de la shortlist par statut et affichage de compteurs.
- Possibilité d'annuler une suppression pendant quelques secondes.
- Comparaison de deux développeurs sur une même page.
- Statistiques des profils GitHub et répartition des langages.
- Tri et pagination des dépôts.
- Comparaison entre `fetch` et Axios.
- Ajout de tests automatisés.
- Intégration d'un backend pour sécuriser les fonctionnalités nécessitant une authentification.

## 14. Auteur

**Anass Aouji**

Développeur Web — JavaScript, React & Laravel

- **GitHub :** [Anassaouji](https://github.com/Anassaouji)
- **Projet :** [DevScope](https://github.com/Anassaouji/DevScope)

Projet individuel réalisé dans un cadre pédagogique, consacré à l'intégration d'API REST, au développement frontend JavaScript et à l'optimisation des performances d'une application web.

---

**DevScope v2 — Search. Analyze. Recruit.**
