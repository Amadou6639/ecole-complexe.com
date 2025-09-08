# Documentation de l'API
Cette API permet de gérer les entités d'un système scolaire : classes, élèves, enseignants, matières, évaluations et notes. Toutes les réponses sont au format JSON.

### Conventions Générales

URL de base : /api
Réponses de succès :
200 OK pour les requêtes réussies (lecture).
201 Created pour la création de ressources réussie.
Réponses d'erreur :
404 Not Found: La ressource demandée n'existe pas.
405 Method Not Allowed: La méthode HTTP utilisée n'est pas autorisée pour l'endpoint.
422 Unprocessable Entity: Les données fournies sont invalides (champs manquants, doublons, etc.). Le corps de la réponse contient un objet errors.
json

### Documentation de l'API de Gestion Scolaire

Cette API permet de gérer les entités d'un système scolaire : classes, sous-classes, élèves, enseignants, matières, évaluations et notes. Toutes les réponses sont au format `JSON`.

### Conventions Générales
*   **URL de base :** `/api`
*   **Réponses de succès :**
    *   `200 OK` pour les requêtes réussies (lecture, mise à jour, suppression).
    *   `201 Created` pour la création de ressources réussie.
*   **Réponses d'erreur :**
    *   `404 Not Found`: La ressource demandée n'existe pas.
    *   `405 Method Not Allowed`: La méthode HTTP utilisée n'est pas autorisée pour le endpoint.
    *   `422 Unprocessable Entity`: Les données fournies sont invalides (champs manquants, doublons, contraintes non respectées). Le corps de la réponse contient un objet `errors`.

```json
{
  "errors": {
    "nom": "Le champs nom est requis"
  }
}
```

Endpoints
### Gestion des Classes (classes)
`POST` /api/classes/

#### Description: Récupère une liste paginée des classes.
Corps de la requête (form-data) :
page (integer, optionnel, défaut: 1): Le numéro de la page.
per_page (integer, optionnel, défaut: 100): Le nombre d'éléments par page.
Réponse (200 OK) :

---

### Endpoints

#### Gestion des Classes (`classes`)

*   **`GET /api/classes/`**
    *   **Description :** Récupère une liste paginée des classes.
    *   **Paramètres d'URL (Query Params) :**
        *   `page` (integer, optionnel, défaut: 1): Le numéro de la page.
        *   `per_page` (integer, optionnel, défaut: 100): Le nombre d'éléments par page.
    *   **Réponse (200 OK) :**
```json
{
  "page": 1,
  "perPage": 100,
  "total": 2,
  "page": 1,
  "data": [
    {
      "id": 1,
      "nom": "CP1"
    },
    {
      "id": 2,
      "nom": "CE1"
    }
]
}
```
### POST /api/classes/post.php

Description : Crée une nouvelle classe.
Corps de la requête (form-data) :
nom (string, requis): Le nom de la classe (doit être unique).
Réponse (201 Created) :

*   **`POST /api/classes/post.php`**
    *   **Description :** Crée une nouvelle classe.
    *   **Corps de la requête (form-data) :**
        *   `nom` (string, requis): Le nom de la classe (doit être unique).
    *   **Réponse (201 Created) :**
```json
{
  "nom": "CE1",
  "id": 6
}
```

### POST /api/classes/update.php

Description : Met à jour une classe existante.
Corps de la requête (form-data) :
id (integer, requis): L'ID de la classe à mettre à jour.
nom (string, requis): Le nouveau nom de la classe (doit être unique).
Réponse (200 OK) :
json
        ```

*   **`POST /api/classes/update.php`**
    *   **Description :** Met à jour une classe existante.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis): L'ID de la classe à mettre à jour.
        *   `nom` (string, requis): Le nouveau nom de la classe (doit être unique).
    *   **Réponse (200 OK) :**
``` json
{
  "id": "6",
  "nom": "CE1-Modifié"
}
```
### POST /api/classes/delete.php

Description : Supprime une classe. La suppression échoue si des sous-classes y sont rattachées.
Corps de la requête (form-data) :
id (integer, requis): L'ID de la classe à supprimer.
Réponse (200 OK) : true en cas de succès.
Gestion des Sous-Classes (sous_classes)
POST /api/sous_classes/

Description : Récupère une liste paginée des sous-classes avec leur classe parente.
Corps de la requête (form-data) :
page (integer, optionnel, défaut: 1): Le numéro de la page.
per_page (integer, optionnel, défaut: 100): Le nombre d'éléments par page.
Réponse (200 OK) :
json
        ```

*   **`POST /api/classes/delete.php`**
    *   **Description :** Supprime une classe. La suppression échoue si des sous-classes y sont rattachées.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis): L'ID de la classe à supprimer.
    *   **Réponse (200 OK) :** `true` en cas de succès.

---

#### Gestion des Sous-Classes (`sous_classes`)

*   **`GET /api/sous_classes/`**
    *   **Description :** Récupère une liste paginée des sous-classes avec leur classe parente.
    *   **Paramètres d'URL (Query Params) :**
        *   `page` (integer, optionnel, défaut: 1): Le numéro de la page.
        *   `per_page` (integer, optionnel, défaut: 100): Le nombre d'éléments par page.
    *   **Réponse (200 OK) :**
```json
{
  "page": 1,
  "perPage": 100,
  "total": 2,
  "page": 1,
  "data": [
    {
      "id": 1,
      "nom": "CP1 A",
      "classe" :{
        "id": 1,
        "nom": "CP1"
      }
    },
    {
      "id": 2,
      "nom": "CE1 A",
      "classe" :{
        "id": 2,
        "nom": "CE1"
      }
    }
  ]
}
```
---

### POST /api/sous_classes/post.php

Description : Crée une nouvelle sous-classe.
Corps de la requête (form-data) :
nom (string, requis): Le nom de la sous-classe (doit être unique).
classe_id (integer, requis): L'ID de la classe parente.
Réponse (201 Created) :

*   **`POST /api/sous_classes/post.php`**
    *   **Description :** Crée une nouvelle sous-classe.
    *   **Corps de la requête (form-data) :**
        *   `nom` (string, requis): Le nom de la sous-classe (doit être unique).
        *   `classe_id` (integer, requis): L'ID de la classe parente.
    *   **Réponse (201 Created) :**
```json
{
  "nom": "CE1A",
  "classe_id": "6",
  "id": 11
}
```
### POST /api/sous_classes/update.php

Description : Met à jour une sous-classe.
Corps de la requête (form-data) :
id (integer, requis): L'ID de la sous-classe.
nom (string, requis): Le nouveau nom.
classe_id (integer, requis): L'ID de la classe parente.
Réponse (200 OK) :
json
        ```

*   **`POST /api/sous_classes/update.php`**
    *   **Description :** Met à jour une sous-classe.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis): L'ID de la sous-classe.
        *   `nom` (string, requis): Le nouveau nom.
        *   `classe_id` (integer, requis): L'ID de la classe parente.
    *   **Réponse (200 OK) :**
```json
{
  "id": "11",
  "nom": "CE1A-Modifié",
  "classe_id": "6"
}
```

### POST /api/sous_classes/delete.php

Description : Supprime une sous-classe. La suppression échoue si des élèves ou des affectations d'enseignants y sont liés.
Corps de la requête (form-data) :
id (integer, requis): L'ID de la sous-classe.
Réponse (200 OK) : true en cas de succès.
Gestion des Élèves (eleves)
POST /api/eleves/

Description : Récupère une liste paginée des élèves.
Corps de la requête (form-data) :
page (integer, optionnel, défaut: 1): Le numéro de la page.
per_page (integer, optionnel, défaut: 100): Le nombre d'éléments par page.
Réponse (200 OK) :
*   **`POST /api/sous_classes/delete.php`**
    *   **Description :** Supprime une sous-classe. La suppression échoue si des élèves ou des affectations d'enseignants y sont liés.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis): L'ID de la sous-classe.
    *   **Réponse (200 OK) :** `true` en cas de succès.

---

#### Gestion des Élèves (`eleves`)

*   **`GET /api/eleves/`**
    *   **Description :** Récupère une liste paginée des élèves avec leur sous-classe.
    *   **Paramètres d'URL (Query Params) :**
        *   `page` (integer, optionnel, défaut: 1): Le numéro de la page.
        *   `per_page` (integer, optionnel, défaut: 100): Le nombre d'éléments par page.
    *   **Réponse (200 OK) :**

```json
{
  "page": 1,
  "total": 2,
  "perPage": 100,
  "data":[
    {
      "id": 1,
      "nom": "Dupont",
      "prenom": "Jean",
    },
    {
      "id": 2,
      "nom": "Martin",
      "prenom": "Alice",
    }
  ]
}
```

### POST /api/eleves/post.php

Description : Crée un nouvel élève.
Corps de la requête (form-data) :
nom (string, requis)
prenom (string, requis)
date_naissance (date, requis, format: YYYY-MM-DD)
sous_classe_id (integer, requis)
Réponse (200 OK) :


*   **`POST /api/eleves/post.php`**
    *   **Description :** Crée un nouvel élève.
    *   **Corps de la requête (form-data) :**
        *   `nom` (string, requis)
        *   `prenom` (string, requis)
        *   `date_naissance` (date, requis, format: YYYY-MM-DD)
        *   `sous_classe_id` (integer, requis)
    *   **Réponse (201 Created) :**
```json
{
  "nom": "Martin",
  "prenom": "Alice",
  "date_naissance": "2015-06-12",
  "sous_classe_id": "1",
  "id": 51
}
```
### POST /api/eleves/update.php

Description : Met à jour un élève.
Corps de la requête (form-data) :
id (integer, requis)
nom (string, requis)
prenom (string, requis)
date_naissance (date, requis, format: YYYY-MM-DD)
sous_classe_id (integer, requis)
Réponse (200 OK) :

*   **`POST /api/eleves/update.php`**
    *   **Description :** Met à jour un élève.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis)
        *   `nom` (string, requis)
        *   `prenom` (string, requis)
        *   `date_naissance` (date, requis, format: YYYY-MM-DD)
        *   `sous_classe_id` (integer, requis)
    *   **Réponse (200 OK) :**
```json
{
  "id": "51",
  "nom": "Martin",
  "prenom": "Alicia",
  "date_naissance": "2015-06-12",
  "sous_classe_id": "2"
}
```

### POST /api/eleves/delete.php

Description : Supprime un élève. La suppression échoue si des notes sont associées à cet élève.
Corps de la requête (form-data) :
id (integer, requis): L'ID de l'élève.
Réponse (200 OK) : true en cas de succès.
(La documentation pour enseignants, matieres, evaluations, notes et matiere_classe suivrait une structure similaire.)
        ```

*   **`POST /api/eleves/delete.php`**
    *   **Description :** Supprime un élève. La suppression échoue si des notes sont associées à cet élève.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis): L'ID de l'élève.
    *   **Réponse (200 OK) :** `true` en cas de succès.

---

#### Gestion des Enseignants (`enseignants`)

*   **`POST /api/enseignants/update.php`**
    *   **Description :** Met à jour un enseignant et ses affectations (matières et sous-classes enseignées).
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis)
        *   `nom` (string, requis)
        *   `prenom` (string, requis)
        *   `email` (string, requis)
        *   `telephone` (string, requis)
        *   `enseignements` (array, requis): Tableau d'objets `{ "classe": integer, "matiere": integer }`.
    *   **Réponse (200 OK) :**
```json
{
  "id": "1",
  "nom": "Le Prof",
  "prenom": "Gérard",
  "email": "gerard.leprof@ecole.fr",
  "telephone": "0612345678",
  "enseignements": [
    {
      "matiere": { "id": 1, "nom": "Mathématiques" },
      "sous_classe": { "id": 1, "nom": "CP1A" }
    }
  ]
}
```

*(Les endpoints pour lister, créer et supprimer les enseignants suivent une logique similaire aux autres ressources.)*

---

#### Gestion des Matières (`matieres`)

*(Les endpoints pour lister, créer, mettre à jour et supprimer les matières suivent une logique similaire à celle des `classes`.)*

---

#### Gestion des Évaluations (`evaluations`)

*   **`POST /api/evaluations/delete.php`**
    *   **Description :** Supprime une évaluation. La suppression échoue si la matière associée existe.
    *   **Corps de la requête (form-data) :**
        *   `id` (integer, requis): L'ID de l'évaluation.
    *   **Réponse (200 OK) :** `true` en cas de succès.

*(Les endpoints pour lister, créer et mettre à jour les évaluations suivent une logique similaire aux autres ressources.)*

---

#### Gestion des Notes (`notes`)

*   **`POST /api/notes/post.php`**
    *   **Description :** Crée une note pour un élève dans une évaluation spécifique.
    *   **Corps de la requête (form-data) :**
        *   `nom` (string, requis): La note ou la valeur de l'évaluation (ex: "15/20", "Acquis").
        *   `evaluation_id` (integer, requis)
        *   `eleve_id` (integer, requis)
    *   **Réponse (201 Created) :**

```json
{
  "nom": "18/20",
  "evaluation_id": "1",
  "eleve_id": "1",
  "id": 101,
  "eleve": { "id": 1, "nom": "Dupont", "prenom": "Jean", "..." },
  "evaluation": { "id": 1, "nom": "Contrôle 1", "..." }
}
```

*(Les endpoints pour lister, mettre à jour et supprimer les notes suivent une logique similaire aux autres ressources.)*

---

#### Affectation Matières-Classes (`matiere_classe`)

*   **`POST /api/matiere_classe/post.php`**
    *   **Description :** Affecte une matière à une classe.
    *   **Corps de la requête (form-data) :**
        *   `matiere_id` (integer, requis)
        *   `classe_id` (integer, requis)
    *   **Réponse (201 Created) :**
```json
{
  "matiere_id": "1",
  "classe_id": "1",
  "id": 25,
  "matiere": { "id": 1, "nom": "Mathématiques", "..." },
  "classe": { "id": 1, "nom": "CP1", "..." }
}
```

