let form = document.querySelector("#formulaire");
let searchCocktails = document.querySelector("#recherche-cocktails");
let myCocktails = document.querySelector("#affichage-cocktails");
let randomButton = document.querySelector("#aleatoire");

form.addEventListener("submit", (e) => {
    

    e.preventDefault();

    myCocktails.innerHTML = "";

    let userRequest = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchCocktails.value;
    fetchCocktails(userRequest);
})

randomButton.addEventListener("click", (e) => {
    e.preventDefault();
    myCocktails.innerHTML = "";
    let userRandomRequest = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
    
    fetchRandomCocktails (userRandomRequest);
})


function fetchCocktails(query){
    fetch(query).then((response) => {
        
        return response.json();
    }).then((data) => {
        console.log(data);
        displayCocktails(data.drinks);
    })
}

function fetchRandomCocktails(query){
    fetch(query).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        displayCocktails(data.drinks);
    })
}

function displayCocktails(drinks){
    for (let i = 0 ; i < drinks.length ; i++){
        
        let column = document.createElement("div");
        column.classList.add("col-3");
        
        // creation de la carte
        let card = document.createElement("div");
        card.classList.add("card", "card-container", "container-carte");
        

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
        
        // On récupère les ingrédients, on crée un paragraphe par ingrédient et on applique le style card-text
        for(j = 1; j < 16; j++){
            let standardObj = drinks[i];
            let stringIngredientLoop = 'strIngredient' + j;
            if(standardObj[stringIngredientLoop]){
                
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

        // autre écriture possible pour générer les éléments html. Plus lisible pour de gros éléments :
        // myCocktails.insertAdjacentHTML('beforeend', `
        //     <div class="card">
        //     ${drinks[i].strInstructionsFR}
        //     </div>`)

    }
    








}
