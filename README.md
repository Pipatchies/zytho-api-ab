# API pour l'application zythologe - Pour les amateurs de bières !

## Contexte du Projet

Cette API REST est conçue pour gérer les informations relatives aux bières artisanales et à leurs brasseries. Elle offre aux utilisateurs la possibilité d'explorer, manipuler et organiser les données grâce à des opérations CRUD complètes. Les fonctionnalités incluent la création, la modification, la suppression et la consultation des détails des bières et des brasseries.

L'API repose sur une architecture robuste pour permettre la manipulation des informations, notamment les noms, descriptions, degrés d'alcool, prix, emplacements et dates d'établissement des brasseries. Elle s'inscrit dans le cadre d'une gestion centralisée et efficace des bières artisanales et de leurs producteurs.

---

## Fonctionnalités

- **Gestion des bières (CRUD)** :

    - **Création** : Ajouter une nouvelle bière à la base de données.

    - **Lecture** : Consulter la liste complète des bières ou les détails d'une bière spécifique.

    - **Mise à jour** : Modifier les informations associées à une bière existante.

    - **Suppression** : Retirer une bière de la base de données.

- **Gestion des brasseries (CRUD)** :

    - **Création** : Ajouter une nouvelle brasserie à la base de données.

    - **Lecture** : Consulter la liste complète des brasseries ou les détails d'une brasserie spécifique.

    - **Mise à jour** : Modifier les informations associées à une brasserie existante.

    - **Suppression** : Retirer une brasserie de la base de données.

---

## Prérequis

Voici les composants que nous allons utiliser pour faire fonctionner l'application :

- 🌐 **Node.js** : Un environnement d'exécution JavaScript côté serveur, nécessaire pour exécuter l'application.

- 🚀 **Express.js** : Un framework web pour Node.js qui facilite la gestion des requêtes HTTP et la création d'API.

- 🔠 **TypeScript** : Un langage de programmation qui étend JavaScript avec des types statiques, utilisé pour assurer une meilleure fiabilité et maintenabilité du code.

- 🐘 **PostgreSQL** : Système de gestion de bases de données relationnelles, utilisé pour héberger les données du projet.

- 📑 **Swagger (OpenAPI)** : Un framework permettant de définir, documenter et tester facilement les API REST.

- 🐳 **Docker** : Cet outil permet de créer des environnements isolés pour exécuter vos applications et services.

- 📦 **Docker Compose** : Un utilitaire qui facilite la définition et l'exécution d'applications composées de plusieurs conteneurs Docker.


## Installation et Configuration

**1. Clonez le dépôt**

Clonez ce projet sur votre machine locale :

```
git clone https://github.com/2024-devops-alt-dist/zythologue_API_ab.git
```
**2. Configurer l'environnement**

Avant de démarrer l'application, vous devez créer un fichier `.env` à la racine de votre projet pour définir les identifiants de votre base de données PostgreSQL.

1. Créer le fichier `.env`

Dans le répertoire racine de votre projet, créez un fichier `.env.`

2. Définir les variables d'environnement

Ajoutez les lignes suivantes dans votre fichier ``.env`` :

```
POSTGRES_USER=username
POSTGRES_HOST=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=your_database_name
POSTGRES_PORT=5432

```

3. Ajouter le ``.env`` dans le ``.gitignore``

Pour éviter que vos identifiants sois sur github, vous devez mettre le fichier ``.env`` dans le ``.gitignore`` comme ceci :

```html
echo .env >> .gitignore
```

4. Demarrer l'applications avec Docker Compose

Une fois le fichier ``.env`` configuré et ajouté au ``.gitignore``, vous devez démarrer les services définis dans votre projet avec Docker Compose.

La commande a faire dans ``bash`` :

```hmlt
docker-compose up --build
```

Pour vérifier que le conteneur sois bien actif aller sur docker Desktop ou taper la commande dans ``bash`` :

```
docker-compose ps
```
---
## Utilisation de l'API

🌐 Méthodes HTTP Principales

| Méthode | Endpoint                        | Description                           |
|---------|---------------------------------|---------------------------------------|
| GET     | /api/v1/beers                   | Liste toutes les bières               |
| GET     | /api/v1/beers/:id               | Détails d'une bière                  |
| POST    | /api/v1/beers                   | Ajoute une nouvelle bière            |
| PUT     | /api/v1/beers/:id               | Met à jour une bière existante       |
| DELETE  | /api/v1/beers/:id               | Supprime une bière                   |
| GET     | /api/v1/breweries               | Liste toutes les brasseries          |
| GET     | /api/v1/breweries/:id           | Détails d'une brasserie              |
| POST    | /api/v1/breweries               | Ajoute une nouvelle brasserie        |
| PUT     | /api/v1/breweries/:id           | Modification d'une brasserie         |
| DELETE  | /api/v1/breweries/:id           | Suppression d'une brasserie          |

---

## Documentation de l'API
Si vous souhaitez des informations sur les différentes méthodes utilisées par l'API, rendez-vous sur la documentation Swagger ci-dessous :

📍 : http://localhost:3000/api-docs

---

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer à ce projet :

- Forkez le dépôt.

- Créez une branche pour votre fonctionnalité (git checkout -b feature/ma-fonctionnalité).

- Effectuez vos modifications et validez-les (git commit -am 'Ajoute ma nouvelle fonctionnalité').

- Poussez vos modifications (git push origin feature/ma-fonctionnalité).

- Ouvrez une Pull Request.
