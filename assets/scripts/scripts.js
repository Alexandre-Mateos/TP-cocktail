let searchCocktails = document.querySelector("#recherche-cocktails");
let myCocktails = document.querySelector("#affichage-cocktails");

function fetchCocktails(query){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+query).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        displayCocktails(data.drinks);
    })
}


function displayCocktails(drinks){
    for (let i = 0 ; i < drinks.length ; i++){
        console.log(drinks[i].strDrink)
        
        // creation de la carte
        let card = document.createElement("div");
        card.classList.add("card", "card-container");
        

        // on récupère les image des cocktails à afficher dans la carte et on les attaches à card
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = drinks[i].strDrinkThumb;
        card.insertAdjacentElement("beforeend", img);
        
        // on crée le corps de la carte
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // on crée l'élément qui accueil le nom du cocktail et on l'attache à cardBody
        let paraTitleCocktail = document.createElement("h2");
        paraTitleCocktail.classList.add("card-title");
        paraTitleCocktail.innerHTML = drinks[i].strDrink;
        cardBody.insertAdjacentElement("beforeend", paraTitleCocktail);

        // on récupère tous les ingrédients?
        

        // on crée l'élément qui accueil les instructions et on l'attache à cardBody
        let paraInstruCocktail = document.createElement("p");
        paraInstruCocktail.classList.add("card-text");
        paraInstruCocktail.innerHTML = drinks[i].strInstructionsFR;
        cardBody.insertAdjacentElement("beforeend", paraInstruCocktail);

        

        // je rattache cardBody a card
        card.insertAdjacentElement("beforeend", cardBody);

        // j'attache card à ma page HTML via myCocktail ("#affichage-cocktails")
        myCocktails.insertAdjacentElement("beforeend", card);
    }
    
}

console.log(fetchCocktails("vodka"));