# 🍸 TP Fetch – Bar des Cocktails

## Objectif

Créer une mini-application web qui permet à l’utilisateur de :

- 🔍 Rechercher des cocktails par **nom ou ingrédient**
- 🎲 Obtenir un **cocktail aléatoire**
- 📋 Afficher les informations de chaque cocktail :
    - Son **image**
    - Sa **liste d’ingrédients**
    - Les **instructions de préparation**

---

## 1. Interface utilisateur

Le formulaire contiendra :

- Un champ texte `input` pour taper un nom ou un ingrédient
- Un bouton `Rechercher`
- Un bouton `Cocktail aléatoire`

---

## 2. Fonctionnalités

### ✅ Lorsqu’on clique sur **Rechercher** :
- On fait un `fetch` vers l’API publique TheCocktailDB :
    - URL : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito`
    - (remplace "mojito" par ce que l'utilisateur a saisi)
- On affiche :
    - 📷 Le nom du cocktail
    - 🍋 Les ingrédients et quantités (jusqu’à 15 max)
    - 📖 Les instructions de préparation
    - (Optionnel : une image du cocktail)

### 🎲 Lorsqu’on clique sur **Cocktail aléatoire** :
- On fait un `fetch` vers :
    - `https://www.thecocktaildb.com/api/json/v1/1/random.php`
- On affiche **un seul cocktail** aléatoire, avec les mêmes infos.

---

## 3. Contraintes techniques

- Utilise `fetch()` pour appeler l’API
- Utilise `createElement()` / `appendChild()` / `append()` pour générer dynamiquement le HTML
- Utilise Bootstrap pour que ce soit lisible (grille, `card`, `row`, `col`)
- Aucun rechargement de page (`event.preventDefault()` obligatoire)
- Code séparé dans `index.html` et `script.js`

---

## 4. Fonctions recommandées

### `fetchCocktails(query)`
- Reçoit une chaîne de recherche
- Effectue une requête vers l’API avec `search.php?s=query`
- Appelle une fonction `displayCocktails(drinks)` pour afficher le résultat

### `fetchRandomCocktail()`
- Fait une requête vers `random.php`
- Appelle `displayCocktails([drink])`

### `displayCocktails(drinks)`
- Vide le conteneur de résultats
- Pour chaque cocktail dans le tableau :
    - Crée une `card` Bootstrap avec :
        - L’image (`strDrinkThumb`)
        - Le nom (`strDrink`)
        - Les ingrédients (`strIngredient1` à `strIngredient15`)
        - Les instructions (`strInstructions`)

---

## 5. Conseils

- Tu vas avoir besoin de `event.preventDefault()` pour stopper la soumission du formulaire
- Utilise des `console.log()` à chaque étape pour vérifier ce que tu obtiens
- Marche à suivre :
    1. Vérifie que ton bouton fonctionne bien (`console.log("clic !")`)
    2. Teste le `fetch()` seul et affiche le JSON
    3. Affiche un cocktail en console
    4. Génère le HTML à la main
    5. Puis ajoute dynamiquement dans le DOM

---

## 6. Bonus

- 🔄 Ajoute un bouton "Effacer les résultats"
- 🎨 Ajoute une barre de chargement ou un message "Recherche en cours..."
- 🧠 Affiche un message si aucun résultat n’est trouvé

---

## 7. Résultat attendu

```text
Je cherche "vodka" :
→ Cosmopolitan
→ Bloody Mary
→ Sex on the Beach

Je clique sur "Cocktail aléatoire" :
→ Surprise ! Margarita 🍸

Chaque cocktail affiché :
- Image
- Titre
- Liste des ingrédients
- Instructions
```

## 8. L’API utilisée
```text
Documentation de l’API : https://www.thecocktaildb.com/api.php
Deux endpoints utiles :
- Recherche par nom : https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito
- Cocktail aléatoire : https://www.thecocktaildb.com/api/json/v1/1/random.php
```

## 9. A toi de jouer !