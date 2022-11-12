// Create an app object (recipeRescue)
// Create apiKey and url variable

// Add searchParams
// - apiKey
// - ingredients
// - number of recipes

// Create a method (getIngredients) to get user data
// - add a event listener to the submit button

// Create a method (getRecipes) which gets recipes that include the user inputs
// Display recipe image & title and append to a gallery div
// When user selects a recipe, retrieve and store id of recipe

// Create a method (recipeLink) which uses the id as a argument
// Get the sourceUrl for the recipe based on the id
// Redirect user to sourceUrl when they choose the recipe

// Create an init method to kick off the setup of the application


// namespace
const recipeRescue = {};

//api key        
const apiKey = "f7e6e031ca8b40dea61881ae0346b75b";

// getRecipes method to get recipes from user input
recipeRescue.getRecipes = function () {
    // make a call to the api
    const getRecipesUrl = new URL("https://api.spoonacular.com/recipes/findByIngredients");
    // search params
    getRecipesUrl.search = new URLSearchParams({
        apiKey: apiKey,
        ingredients: "egg, tomato",
        number: 3
    });

    fetch(getRecipesUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonRes) {
            console.log(jsonRes);
            // calling displayRecipes function:
            recipeRescue.displayRecipes(jsonRes);
        });
};

// displayRecipes function to get recipes from api call onto the page
recipeRescue.displayRecipes = function (recipesList) {
    recipesList.forEach(function (recipe) {
        // create a h3:
        const recipeTitle = document.createElement("h3");
        // add the recipe name to the h3:
        recipeTitle.innerText = recipe.title;
        // create the image element for the recipe image:
        const recipeImage = document.createElement("img");
        // add the recipe image to the image element:
        recipeImage.src = recipe.image;
        // add alt to image (recipe title):
        recipeImage.alt = recipe.title;
        // create the li for our html ul:
        const recipeBox = document.createElement("li");
        // append h3 and image to li:
        recipeBox.appendChild(recipeImage);
        recipeBox.appendChild(recipeTitle);


        // create variable to hold ul element:
        const ulElement = document.querySelector("ul");
        // append li to ul:
        ulElement.appendChild(recipeBox);

    });
};


















// init method
recipeRescue.init = function () {
    // calling getRecipes function:
    recipeRescue.getRecipes();
};

// call init method
recipeRescue.init();

