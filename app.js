// namespace
const recipeRescue = {};

//api key        
// const apiKey = "f7e6e031ca8b40dea61881ae0346b75b"; //Laura's API
const apiKey = `d1f99c8f40004bf4a6894df959eca9ef`; //Leo's API

// Create a method (getUserInput) to get user data
// - add an event listener to the submit button
recipeRescue.getUserInput = function () {
    document.querySelector("button").addEventListener("click", function (e) {
        e.preventDefault();
        // create empty string for ingredient search param:
        let string = "";

        // grab all inputs, iterate through each element, and concat the value to the string:
        document.querySelectorAll("input").forEach(function (food) {
            string = string.concat(food.value, ",");
        })

        // Error handling => no inputs
        // if blank (except for commas) => alert, else => continue
        if (string === ",,,,,") {
            alert("You have not entered any ingredients!");
        }
        else {
            // pass string to getRecipes method:
            recipeRescue.getRecipes(string);
        }
    })
};

// getRecipes method to get recipes from user input
recipeRescue.getRecipes = function (ingredients) {
    // make a call to the api
    const getRecipesUrl = new URL("https://api.spoonacular.com/recipes/findByIngredients");
    // search params
    getRecipesUrl.search = new URLSearchParams({
        apiKey: apiKey,
        ingredients: ingredients,
        number: 3
    });

    fetch(getRecipesUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonRes) {
            // clearing the ul before adding new recipes to the page:
            document.querySelector("ul").innerHTML = " ";

            // Error Handling - inputs yield no results (typos)
            // if jsonRes.length = 0 => alert
            if (jsonRes.length === 0) {
                alert("Please check your spelling and try again!");
            }
            else {
                // calling displayRecipes function:
                recipeRescue.displayRecipes(jsonRes);
            }
        });
};

// displayRecipes function to get recipes from api call onto the page
recipeRescue.displayRecipes = function (recipesList) {
    recipesList.forEach(function (recipe) {
        // create the image element for the recipe image:
        const recipeImage = document.createElement("img");
        // add the recipe image to the image element:
        recipeImage.src = recipe.image;
        // add alt to image (recipe title):
        recipeImage.alt = recipe.title;
        // create the li for our html ul:
        const recipeBox = document.createElement("li");
        // append image to li:
        recipeBox.appendChild(recipeImage);


        // create variable to hold ul element:
        const ulElement = document.querySelector("ul");
        // append li to ul:
        ulElement.appendChild(recipeBox);

        // method call to get urls
        recipeRescue.recipeLink(recipe.id, recipeBox);
    });
};

// Create a method (recipeLink) which uses the id as an argument
recipeRescue.recipeLink = function (id, recipeBox) {
    const recipeSrcUrl = new URL(`https://api.spoonacular.com/recipes/${id}/information`);

    recipeSrcUrl.search = new URLSearchParams({
        apiKey: apiKey
    })

    fetch(recipeSrcUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonRes) {
            // Get the sourceUrl for the recipe based on the id

            // create an anchor:
            const recipeTitle = document.createElement("a");
            // add the recipe name to the anchor with href:
            recipeTitle.innerText = jsonRes.title;
            recipeTitle.href = jsonRes.sourceUrl;
            // append anchor to li:
            recipeBox.appendChild(recipeTitle);
        })
}

// init method
recipeRescue.init = function () {
    recipeRescue.getUserInput();
};

// call init method
recipeRescue.init();

