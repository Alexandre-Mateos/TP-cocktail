let form = document.querySelector("#formulaire");
let searchCocktails = document.querySelector("#recherche-cocktails");
let myCocktails = document.querySelector("#affichage-cocktails");
let favoriteCocktail = document.querySelector("#cocktails-favoris");
let randomButton = document.querySelector("#aleatoire");
let deleteButton = document.querySelector("#effacer");

// vérifie si mon local storage possède déjà un tableau pour ne pas l'écrase au rechargement de la page.
// s'il n'éxise pas : le créer
if (!localStorage.getItem("myFavCocktails")) {
  // je créer un tableau vide
  const collection = [];
  // j'encode mon tableau avec JSON
  let cocktailCollection = JSON.stringify(collection);
  // je stock mon tableau encodé
  localStorage.setItem("myFavCocktails", cocktailCollection);
}

displayFavCocktail();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  myCocktails.innerHTML = "";

  let userRequest =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
    searchCocktails.value;
  fetchCocktails(userRequest);
  displayFavCocktail();
});

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  myCocktails.innerHTML = "";
  let userRandomRequest = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

  fetchRandomCocktails(userRandomRequest);
});

deleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  myCocktails.innerHTML = "";
});

function fetchCocktails(query) {
  fetch(query)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      if (!data.drinks) {
        falseRequets();
      } else {
        console.log(data);
        displayCocktails(data.drinks);
      }
    });
}

function fetchRandomCocktails(query) {
  fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCocktails(data.drinks);
    });
}

function displayCocktails(drinks) {
  for (let i = 0; i < drinks.length; i++) {
    let column = document.createElement("div");
    column.classList.add("col-lg-4", "col-md-6");

    // creation de la carte
    let card = document.createElement("div");
    card.classList.add("card", "card-container", "h-100");

    // on récupère les image des cocktails à afficher dans la carte et on les attaches à card
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = drinks[i].strDrinkThumb;

    // j'ajoute un évenement sur l'image
    img.addEventListener("click", () => {
      let newFavCocktail = isFavCocktail(drinks[i]);
      saveFavCocktail(newFavCocktail);
      displayFavCocktail();
    });

    card.insertAdjacentElement("beforeend", img);

    // on crée le corps de la carte
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // on crée l'élément qui accueil le nom du cocktail et on l'attache à cardBody
    let paraTitleCocktail = document.createElement("h2");
    paraTitleCocktail.classList.add("card-title");
    paraTitleCocktail.innerHTML = drinks[i].strDrink;
    cardBody.insertAdjacentElement("beforeend", paraTitleCocktail);

    // On récupère les ingrédients, on crée un paragraphe par ingrédient et on applique le style card-text
    for (j = 1; j < 16; j++) {
      let standardObj = drinks[i];
      let stringIngredientLoop = "strIngredient" + j;
      if (standardObj[stringIngredientLoop]) {
        let newIngredient = document.createElement("p");
        newIngredient.classList.add("card-text");
        newIngredient.innerHTML = standardObj[stringIngredientLoop];
        cardBody.insertAdjacentElement("beforeend", newIngredient);
      }
    }

    // on crée l'élément qui accueil les instructions et on l'attache à cardBody
    let paraInstruCocktail = document.createElement("p");
    paraInstruCocktail.classList.add("card-text");
    paraInstruCocktail.innerHTML = drinks[i].strInstructionsFR;
    cardBody.insertAdjacentElement("beforeend", paraInstruCocktail);

    // je rattache cardBody a card
    card.insertAdjacentElement("beforeend", cardBody);

    // j'attache ma card dans ma div column
    column.insertAdjacentElement("beforeend", card);

    // j'attache card à ma page HTML via myCocktail ("#affichage-cocktails")
    myCocktails.insertAdjacentElement("beforeend", column);

    // autre écriture possible pour générer les éléments html en utilisant insertAdjacentHTML. Plus lisible pour de gros éléments :
    // myCocktails.insertAdjacentHTML('beforeend', `
    //     <div class="card">
    //     ${drinks[i].strInstructionsFR}
    //     </div>`)
  }
}

function falseRequets() {
  console.log("rien trouvé");
  let errorMessage = document.createElement("p");
  errorMessage.classList.add("text-center", "fs-4");
  errorMessage.innerHTML = `Désolé nous n'avons pas trouvé de cocktails correspondant à votre recherche. Retentez votre chance avec un autre alcool !`;
  myCocktails.insertAdjacentElement("beforeend", errorMessage);
}

// j'affiche dans la console les infos de la carte et je crée l'objet correspondant pour le stocker plus tard
function isFavCocktail(drinks) {
  let favCocktail = {
    name: drinks.strDrink,
    instructions: drinks.strInstructionsFR,
    img: drinks.strDrinkThumb,
  };
  console.log(favCocktail);
  return favCocktail;
}

// je récupère mon tableau de stockage pour ajouter de nouveaux cocktails
function saveFavCocktail(newFavCocktail) {
  // je récupère mon tableau
  let encodedCocktails = localStorage.getItem("myFavCocktails");
  // je décode mon tableau
  let decodedCocktails = JSON.parse(encodedCocktails);
  // je stocke ma carte dans le tableau
  decodedCocktails.push(newFavCocktail);
  // je réencode mon tableau
  decodedCocktails = JSON.stringify(decodedCocktails);
  // je stock mon tableau dans localStorage
  localStorage.setItem("myFavCocktails", decodedCocktails);
}

function displayFavCocktail() {

  favoriteCocktail.innerHTML = "";

  // je récupère mon tableau
  let encodedFavCocktails = localStorage.getItem("myFavCocktails");
  let decodedFavCocktails = JSON.parse(encodedFavCocktails);

  for (let i = 0; i < decodedFavCocktails.length; i++) {
    // creation des colonnes qui vont accueillir les cartes
    let columnFavCocktail = document.createElement("div");
    columnFavCocktail.classList.add("col-lg-4", "col-md-6");

    // creation de la carte
    let cardFavCocktail = document.createElement("div");
    cardFavCocktail.classList.add("card", "card-container", "h-100");

    // on récupère les image des cocktails dans le local storage et on les attaches à card
    let imgFavCocktail = document.createElement("img");
    imgFavCocktail.classList.add("card-img-top");
    imgFavCocktail.src = decodedFavCocktails[i].img;
    cardFavCocktail.insertAdjacentElement("beforeend", imgFavCocktail);

    // on crée le corps de la carte
    let cardBodyFavCocktail = document.createElement("div");
    cardBodyFavCocktail.classList.add("card-body");


    // on crée l'élément qui accueil le nom du cocktail et on l'attache à cardBody
    let paraTitleFavCocktail = document.createElement("h2");
    paraTitleFavCocktail.classList.add("card-title");
    paraTitleFavCocktail.innerHTML = decodedFavCocktails[i].name;
    cardBodyFavCocktail.insertAdjacentElement("beforeend", paraTitleFavCocktail);

    // on crée l'élément qui accueil les instructions et on l'attache à cardBodyFavCocktail
    let paraInstruFavCocktail = document.createElement("p");
    paraInstruFavCocktail.classList.add("card-text");
    paraInstruFavCocktail.innerHTML = decodedFavCocktails[i].instructions;
    cardBodyFavCocktail.insertAdjacentElement("beforeend", paraInstruFavCocktail);
  
    // je rattache cardBody a card
    cardFavCocktail.insertAdjacentElement("beforeend", cardBodyFavCocktail);
  
    // j'attache ma card dans ma div column
    columnFavCocktail.insertAdjacentElement("beforeend", cardFavCocktail);
  
    // j'attache card à ma page HTML via favoriteCocktail 
    favoriteCocktail.insertAdjacentElement("beforeend", columnFavCocktail);
  }
}
