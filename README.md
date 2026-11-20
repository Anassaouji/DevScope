# DevScope — GitHub Developer Discovery & Recruitment Management

**Application web de recherche, d'analyse et de gestion de candidats développeurs GitHub.**

**HTML5 · Tailwind CSS · JavaScript ES6+ · REST API · GitHub API · MockAPI**

---

## Présentation du projet

**DevScope** est une application web de recrutement technique permettant de rechercher des développeurs sur GitHub, d'analyser leurs profils et leurs projets publics, puis de centraliser et suivre les candidats dans une shortlist.

L'application a été développée en **JavaScript Vanilla (ES6+)**, avec **HTML5** et **Tailwind CSS**, en s'appuyant sur deux API REST :

- **GitHub REST API** pour récupérer les profils des développeurs et leurs dépôts publics.
- **MockAPI** pour enregistrer, consulter, modifier et supprimer les candidats.

Le projet a été réalisé en deux versions successives :

- **DevScope v1 :** recherche de développeurs, consultation des profils GitHub, affichage des dépôts et gestion initiale de la shortlist.
- **DevScope v2 :** évolution de la shortlist avec modification et suppression des candidats, filtrage avancé des dépôts et optimisation des performances grâce à un cache local.

L'objectif est de proposer une interface centralisée, responsive et intuitive pour simplifier les différentes étapes du recrutement technique.

## Démonstration et liens

| Ressource | Lien |
|---|---|
| Application en ligne | [DevScope — Live Demo](https://devscope-blue.vercel.app/) |
| Code source | [GitHub Repository](https://github.com/Anassaouji/DevScope) |
| Gestion du projet v1 | [Jira Board](https://aoujianass.atlassian.net/jira/software/projects/DEV/boards/37/) |
| Gestion du projet v2 | [Jira Board](https://aoujianass.atlassian.net/jira/software/projects/DEVS2/boards/38) |
| Présentation | [Canva Presentation](https://canva.link/66agytw96fovbwv) |

## 1. Contexte et problématique

Dans le recrutement informatique, les recruteurs consultent régulièrement GitHub pour découvrir des développeurs, évaluer leurs compétences techniques et analyser leurs réalisations.

Cependant, plusieurs difficultés se présentent :

- La recherche manuelle de développeurs prend du temps.
- L'analyse des dépôts nécessite de naviguer entre plusieurs pages GitHub.
- Les informations des candidats sont dispersées dans différents outils.
- Le suivi de l'avancement du recrutement devient difficile.
- Les consultations répétées peuvent augmenter inutilement le nombre de requêtes envoyées à GitHub.

**DevScope répond à ces problématiques en centralisant trois opérations essentielles :**

1. **Rechercher** des développeurs sur GitHub.
2. **Analyser** leurs profils et leurs dépôts publics.
3. **Gérer** les candidats dans une shortlist avec un suivi de leur progression.

## 2. Évolution du projet — v1 et v2

Le développement a été réalisé progressivement, en conservant les fonctionnalités existantes lors du passage à la seconde version.

| Fonctionnalité | DevScope v1 | DevScope v2 |
|---|---|---|
| Recherche de profils GitHub | Oui | Conservée |
| Validation du nom d'utilisateur | Oui | Conservée |
| Affichage détaillé du profil | Oui | Conservé |
| Affichage des dépôts publics | Oui | Conservé |
| Ajout à la shortlist | Oui | Conservé |
| Prévention des doublons | Oui | Conservée |
| Recherche des candidats | Oui | Conservée |
| Tri des candidats | Oui | Conservé |
| Recherche des dépôts | Bonus v1 | Obligatoire v2 |
| Filtre des dépôts par langage | Bonus v1 | Obligatoire v2 |
| Modification d'un candidat | Non | Ajoutée |
| Suppression d'un candidat | Non | Ajoutée |
| Gestion du statut et de la note | Non | Ajoutée |
| Cache avec expiration | Non | Ajouté |
| Chargement parallèle des données | Non exigé | Ajouté avec Promise.all |

Le tag Git **`v1.0`** permet d'identifier la première version et de conserver un point de référence avant les évolutions de la v2.

## 3. Fonctionnalités de l'application

### 3.1. Recherche de développeurs

La page d'accueil permet de rechercher un développeur à partir de son nom d'utilisateur GitHub.

**Fonctionnalités :**

- Recherche depuis la page d'accueil ou depuis la page Profil.
- Validation du nom d'utilisateur avant l'envoi de la requête.
- Redirection vers la page du développeur.
- Gestion des saisies invalides.
- Affichage d'un message lorsqu'un profil n'existe pas.
- Gestion des erreurs réseau et des limitations de l'API GitHub.

La validation respecte les principales règles des noms d'utilisateur GitHub : caractères alphanumériques et tirets, longueur maximale de 39 caractères, et absence de tiret au début ou à la fin.

### 3.2. Consultation des profils GitHub

Chaque profil présente les informations publiques récupérées depuis la GitHub REST API :

- Avatar.
- Nom et identifiant GitHub.
- Biographie.
- Localisation.
- Date d'inscription.
- Nombre de dépôts publics.
- Nombre d'abonnés et d'abonnements.
- Lien direct vers le compte GitHub.

Les propriétés absentes ou nulles sont remplacées par des valeurs par défaut afin de maintenir un affichage lisible.

### 3.3. Exploration des dépôts publics

Les dépôts sont présentés sous forme de cartes contenant :

- Nom du dépôt.
- Description du projet.
- Langage de programmation principal.
- Nombre d'étoiles.
- Nombre de forks.
- Date de dernière mise à jour.
- Lien vers le dépôt GitHub.

**Nouveautés v2 — Recherche et filtrage**

La page Profil intègre :

- Un champ de recherche permettant de filtrer les dépôts par nom.
- Une liste déroulante permettant de sélectionner un langage de programmation.
- Une combinaison des deux critères.
- Un message lorsqu'aucun dépôt ne correspond.

Les langages disponibles dans le filtre sont extraits automatiquement des dépôts chargés.

Le filtrage s'effectue directement dans le navigateur avec **`Array.filter()`**, sans requête supplémentaire à GitHub.

### 3.4. Gestion de la shortlist

La shortlist centralise les profils sélectionnés par les recruteurs.

**Fonctionnalités v1 :**

- Ajouter un candidat à la shortlist depuis son profil.
- Enregistrer les candidats dans MockAPI.
- Empêcher l'ajout d'un candidat déjà enregistré.
- Afficher les candidats sous forme de cartes.
- Rechercher un candidat par nom ou login.
- Trier les candidats par nom ou date d'ajout.
- Afficher le nombre total de candidats.

**Nouveautés v2 — Modification**

Chaque carte dispose d'un bouton **Modifier**, qui ouvre une fenêtre modale contenant :

- **Statut :** À contacter, Entretien, Retenu ou Refusé.
- **Note :** évaluation de 1 à 5.
- **Commentaire :** observation ou information sur le candidat.

Les nouvelles informations sont envoyées à MockAPI avec une requête HTTP `PUT`.

Après une modification réussie, la carte est actualisée directement dans le DOM, sans rechargement de la page.

**Nouveautés v2 — Suppression**

Un bouton **Supprimer** permet de retirer un candidat de la shortlist.

Le fonctionnement comprend :

1. Ouverture d'une fenêtre de confirmation.
2. Validation ou annulation de l'opération.
3. Envoi d'une requête HTTP `DELETE`.
4. Suppression de la carte après confirmation de l'API.
5. Actualisation de la liste et du compteur sans rechargement.

### 3.5. Gestion des états de l'interface

L'application prend en charge les différents états des opérations asynchrones :

- Affichage d'indicateurs de chargement.
- Désactivation des boutons pendant les requêtes de modification et de suppression.
- Prévention des actions répétées.
- Messages adaptés aux erreurs HTTP.
- Gestion des problèmes de connexion.
- Affichage d'un état vide lorsque la shortlist ou les résultats sont absents.

Ces mécanismes améliorent la fiabilité de l'interface et permettent à l'utilisateur de comprendre le résultat de chaque opération.

## 4. Optimisation des performances — DevScope v2

### 4.1. Cache local avec expiration

La deuxième version intègre un système de cache utilisant **`localStorage`**.

Le cache permet de conserver temporairement les données d'un profil GitHub et ses dépôts publics.

**Durée de validité : 10 minutes.**

**Fonctionnement :**

1. L'utilisateur consulte un profil.
2. L'application vérifie si les données existent dans le cache.
3. Si le cache est valide, les informations sont récupérées immédiatement depuis `localStorage`.
4. Si les données sont absentes ou expirées, l'application contacte GitHub.
5. Les nouvelles données sont enregistrées dans le cache avec leur durée de validité.

La sérialisation est réalisée avec `JSON.stringify()` et la lecture avec `JSON.parse()`.

**Avantages :**

- Réduction des appels répétitifs à GitHub.
- Affichage plus rapide des profils déjà consultés.
- Limitation de la consommation du quota de requêtes.
- Amélioration de la fluidité de navigation.

### 4.2. Chargement parallèle avec Promise.all

Lorsqu'aucune donnée valide n'est disponible dans le cache, l'application peut récupérer simultanément :

- Les informations du profil GitHub.
- Les dépôts publics du développeur.

L'utilisation de **`Promise.all()`** permet d'exécuter ces deux opérations indépendantes en parallèle plutôt que successivement.

Cette approche réduit le temps d'attente lié aux requêtes réseau.

## 5. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure sémantique des pages |
| Tailwind CSS | Mise en page, design et responsive |
| JavaScript ES6+ | Logique applicative et manipulation du DOM |
| GitHub REST API | Récupération des profils et dépôts publics |
| MockAPI | Gestion et persistance des candidats |
| Fetch API | Requêtes HTTP asynchrones |
| LocalStorage | Mise en cache des profils |
| Git | Versionnement du code source |
| GitHub | Hébergement et suivi du dépôt |
| Jira | Organisation des epics, stories et tâches |
| Vercel | Déploiement de l'application |

**Concepts JavaScript exploités :**

`async/await`, `Promise.all`, `fetch`, `try/catch`, `import/export`, `filter`, `sort`, `find`, `some`, `map`, `JSON.stringify`, `JSON.parse`, `Date.now`, `createElement`, `textContent`, `addEventListener`.

## 6. Architecture et organisation du code

Le projet repose sur une architecture frontend modulaire avec des modules JavaScript ES6.

**Structure logique du projet :**

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
├── .gitignore
└── README.md
```

**Responsabilités des modules :**

| Fichier | Responsabilité |
|---|---|
| `config.js` | URLs des API et constantes de configuration |
| `api.js` | Appels API et gestion des réponses HTTP |
| `cache.js` | Stockage, récupération et expiration du cache |
| `utils.js` | Validation et fonctions utilitaires |
| `states.js` | Gestion des états de l'interface |
| `search.js` | Recherche des utilisateurs GitHub |
| `profil.js` | Profil, dépôts, recherche et filtrage |
| `shortlist.js` | Affichage, recherche, tri et CRUD des candidats |

L'organisation par modules permet de séparer la logique de communication avec les API, les traitements de données et la manipulation du DOM.

Elle facilite également la réutilisation des fonctions et la maintenance du projet.

## 7. Intégration des API REST

### 7.1. GitHub REST API

L'application exploite les endpoints publics suivants :

```http
GET https://api.github.com/users/{username}
GET https://api.github.com/users/{username}/repos
```

**GET `/users/{username}`**

Récupère les informations publiques du développeur : nom, avatar, biographie, localisation, statistiques et liens.

**GET `/users/{username}/repos`**

Récupère une liste des dépôts publics du développeur, avec leurs métadonnées.

Le filtrage des dépôts est réalisé sur les données récupérées, directement côté navigateur.

### 7.2. MockAPI

MockAPI assure la persistance des candidats.

| Méthode | Endpoint | Description | Version |
|---|---|---|---|
| GET | `/candidats` | Récupérer les candidats | v1 |
| POST | `/candidats` | Ajouter un candidat | v1 |
| PUT | `/candidats/:id` | Modifier un candidat | v2 |
| DELETE | `/candidats/:id` | Supprimer un candidat | v2 |

Les requêtes utilisent `fetch()` avec `async/await`, `try/catch` et une vérification de `response.ok`.

Les requêtes `POST` et `PUT` transmettent des données au format JSON avec l'en-tête `Content-Type: application/json`.

### 7.3. Structure d'un candidat

Exemple de représentation d'un candidat dans MockAPI :

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
  "note": "Bon niveau JavaScript et projets intéressants.",
  "createdAt": "2026-11-16T10:00:00.000Z"
}
```

Les propriétés `status`, `rating` et `note` permettent de suivre la progression du candidat dans le processus de recrutement.

## 8. Gestion des erreurs

DevScope intègre une gestion des erreurs pour les interactions avec les services externes.

| Situation | Comportement attendu |
|---|---|
| Nom d'utilisateur invalide | Message de validation |
| HTTP 404 | Message indiquant que la ressource est introuvable |
| HTTP 403 | Message d'accès refusé ou de limitation |
| HTTP 429 | Message de limitation du nombre de requêtes |
| Erreur réseau | Message de connexion et possibilité de réessayer |
| Shortlist vide | Affichage d'un état vide |
| Aucun dépôt correspondant | Message indiquant l'absence de résultats |
| Échec d'une modification | Conservation de l'état précédent et message d'erreur |
| Échec d'une suppression | Conservation du candidat et message d'erreur |

Les appels asynchrones sont encadrés avec `try/catch` et les réponses HTTP sont vérifiées avant l'exploitation des données.

## 9. Interface utilisateur et responsive design

L'application est composée de trois pages HTML :

| Page | Fichier | Fonction |
|---|---|---|
| Recherche | `index.html` | Rechercher un développeur |
| Profil | `profil.html?username=...` | Consulter et analyser un profil |
| Shortlist | `shortlist.html` | Gérer les candidats |

L'interface est développée avec **Tailwind CSS** selon une approche responsive.

Elle comprend :

- Une navigation commune aux trois pages.
- Des cartes de présentation des profils et dépôts.
- Des formulaires de recherche et de filtrage.
- Des modales de modification et de suppression.
- Des indicateurs de chargement.
- Des messages de validation et d'erreur.

Les nouveaux champs disposent de labels et les fenêtres modales doivent rester utilisables au clavier.

Pour afficher les données provenant des API, l'application privilégie `createElement()` et `textContent`, plutôt que l'insertion directe de données externes avec `innerHTML`.

## 10. Installation et exécution locale

### Prérequis

- Git.
- Visual Studio Code ou un éditeur équivalent.
- Navigateur web moderne.
- Extension Live Server ou serveur HTTP local.
- Connexion Internet pour utiliser les API.

### Cloner le projet

```bash
git clone https://github.com/Anassaouji/DevScope.git
```

### Accéder au dossier

```bash
cd DevScope
```

### Lancer le projet

1. Ouvrir le dossier dans Visual Studio Code.
2. Vérifier la configuration des endpoints de l'API MockAPI.
3. Ouvrir `index.html` avec Live Server.
4. Rechercher un développeur GitHub et explorer ses projets.

Aucune installation de dépendances npm ni compilation n'est nécessaire pour exécuter la logique JavaScript native.

## 11. Sécurité et bonnes pratiques

Le projet applique plusieurs bonnes pratiques de développement frontend :

- Validation du nom d'utilisateur avant les requêtes.
- Vérification des statuts HTTP avec `response.ok`.
- Gestion des erreurs avec `try/catch`.
- Utilisation de `textContent` pour les données externes.
- Séparation des responsabilités avec les modules ES6.
- Prévention des doublons dans la shortlist.
- Contrôle des actions asynchrones.
- Vérification de la validité des données en cache.

**Sécurité des tokens GitHub :**

Aucun token personnel GitHub ne doit être publié dans le code source ou dans l'historique Git.

Les variables d'environnement injectées dans une application frontend ne rendent pas un secret confidentiel si sa valeur est envoyée au navigateur.

Une authentification nécessitant un token secret doit être gérée par un backend sécurisé.

## 12. Tests et validation

Les principaux scénarios de test du projet couvrent :

### Recherche et profil

- Recherche d'un utilisateur existant.
- Recherche d'un utilisateur inexistant.
- Validation des noms d'utilisateur incorrects.
- Affichage des informations manquantes.
- Gestion des erreurs réseau.

### Dépôts

- Chargement des dépôts publics.
- Recherche d'un dépôt par nom.
- Filtrage par langage.
- Combinaison recherche et filtre.
- Affichage d'un résultat vide.

### Shortlist

- Ajout d'un candidat.
- Prévention des doublons.
- Recherche et tri des candidats.
- Modification du statut, de la note et du commentaire.
- Confirmation avant suppression.
- Mise à jour de l'interface sans rechargement.
- Désactivation des boutons pendant les requêtes.
- Gestion des échecs des opérations API.

### Cache et performance

- Chargement initial depuis GitHub.
- Lecture depuis `localStorage` avant expiration.
- Nouvelle requête après expiration du cache.
- Vérification des requêtes dans l'onglet Network.
- Chargement parallèle du profil et des dépôts.

### Accessibilité et qualité

- Affichage sur mobile, tablette et ordinateur.
- Navigation au clavier.
- Labels associés aux champs.
- Textes alternatifs pour les images.
- Validation du HTML avec [W3C Validator](https://validator.w3.org/).

## 13. Gestion de projet et versionnement

Le projet a été réalisé individuellement dans le cadre de deux briefs de développement web.

**DevScope v1 — 9 au 13 novembre 2026**

Objectif : développer les fonctionnalités principales de recherche, consultation et gestion initiale des candidats.

**DevScope v2 — 16 au 20 novembre 2026**

Objectif : améliorer le suivi des candidats, l'exploration des dépôts et les performances de l'application.

L'organisation repose sur :

- Un tableau Jira avec epics, user stories et sous-tâches.
- Des commits Git réguliers associés aux tickets Jira.
- Des branches de développement pour isoler les fonctionnalités.
- Un tag Git `v1.0` pour identifier la première version.
- Une documentation mise à jour avec les fonctionnalités de la v2.

**Exemples de messages de commit :**

```bash
DEV-10 : ajouter la recherche des dépôts
DEV-11 : implémenter le filtre par langage
DEV-12 : ajouter la modification des candidats
DEV-13 : implémenter la suppression des candidats
DEV-14 : ajouter le cache avec expiration
```

Les identifiants ci-dessus sont des exemples de format et ne représentent pas nécessairement les tickets réels du projet.

## 14. Compétences développées

La réalisation des deux versions a permis de mettre en pratique :

**Développement frontend**
- HTML5 sémantique et Tailwind CSS.
- Responsive design et accessibilité.
- Manipulation dynamique du DOM.
- Gestion des événements et formulaires.

**JavaScript**
- Modules ES6 avec `import` / `export`.
- Méthodes de tableaux : `filter`, `sort`, `find`, `some`.
- Gestion des états et rendu dynamique.
- Programmation asynchrone avec `async/await`.
- Gestion des promesses avec `Promise.all`.

**API et persistance**
- Consommation de services REST.
- Méthodes HTTP GET, POST, PUT et DELETE.
- Gestion des réponses et erreurs HTTP.
- Sérialisation et désérialisation JSON.
- Persistance des candidats avec MockAPI.
- Optimisation des requêtes avec un cache local.

**Méthodes et outils**
- Organisation modulaire du code.
- Git, GitHub et gestion des versions.
- Planification des tâches avec Jira.
- Tests fonctionnels et débogage.
- Déploiement d'une application web.

## 15. Perspectives d'évolution

Les évolutions futures possibles comprennent :

- Filtrage de la shortlist par statut avec des compteurs.
- Annulation d'une suppression pendant cinq secondes.
- Comparaison de deux développeurs côte à côte.
- Statistiques des profils et répartition des langages.
- Tri des dépôts par étoiles, nom et date.
- Pagination des dépôts.
- Intégration d'Axios pour comparer les approches HTTP.
- Ajout de tests automatisés.
- Développement d'un backend sécurisé.

## 16. Auteur

**Anass Aouji**

Développeur Web — JavaScript, React & Laravel

**GitHub :** [github.com/Anassaouji](https://github.com/Anassaouji)

Projet individuel réalisé dans le cadre d'une formation en développement web, avec pour objectifs la maîtrise des API REST, de JavaScript ES6+, de la manipulation du DOM et de la structuration d'applications frontend.

---

**DevScope — Discover developers. Explore projects. Manage talent.**
