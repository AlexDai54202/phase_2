const addRecipeBtn = document.getElementById("addRecipeBtn");
const recipeModules = document.getElementById("recipeModules");
let addRecipeDiv = document.querySelector(".addRecipe");
let editRecipeDiv = document.querySelector(".editRecipe");
addRecipeBtn.onclick = addNewRecipe;
 

function Recipe(title, ingredients, instructions){
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
}

Recipe.prototype = {
    constructor: Recipe
}

let recipeArray = [new Recipe("Spaghetti", "-One 12-ounce box Barilla® Pronto® Half-Cut Spaghetti<br>-Salt to taste<br>-1 pound ground beef or ground sirloin<br>One 24-ounce jar Barilla® Tomato and Basil Sauce<br>-Finely chopped fresh basil for garnishing<br>-Freshly grated Parmesan cheese for garnishing", "1) To a large pan, add the pasta, cover with 3 cups cold water, optional salt to taste, and boil over high heat until water has absorbed, about 10 minutes, but watch your pasta and cook as needed until al dente. While pasta boils, brown the ground beef.<br>2) To a large skillet, add the ground beef and cook over medium-high heat, breaking up the meat with a spatula as it cooks to ensure even cooking.<br>3) After beef has cooked through, add the pasta sauce, stir to combine, and cook for 1 to 2 minutes, or until heated through.<br>4) After pasta has cooked for about 10 minutes, or until all the water has been absorbed, add the sauce over the pasta and toss to combine in the skillet or alternatively plate the pasta and add sauce to each individual plate as desired.<br>5) Optionally garnish with basil and Parmesan to taste and serve immediately. Pasta and sauce are best warm and fresh but extra will keep airtight in the fridge for up to 5 days."), 
new Recipe("Chicken Alfredo", "<b>For the Noodles</b><br>16 ounces dry fettuccine pasta<br><b>For the Chicken</b><br>1 pound boneless, skinless chicken breasts<br>1 teaspoon Italian seasoning<br>3/4 teaspoon kosher salt<br>¼ teaspoon pepper<br>2 tablespoons extra-virgin olive oil<br>1 tablespoon butter<br><b>For the Sauce</b><br>1/2 cup butter, cut into large cubes or slices<br>2 cups heavy whipping cream<br>1 clove garlic, minced<br>3/4 teaspoon garlic powder<br>3/4 teaspoon Italian Seasoning<br>1/4 teaspoon salt<br>1/4 teaspoon pepper<br>2 cups freshly grated Parmesan cheese", "1) Make the noodles: Bring a large pot of salted water to a boil. Add the fettuccine and cook until al dente according to package directions, usually 10 minutes. Reserve 1/2 cup of the cooking water, then drain well. Set aside.<br>2) Make the chicken: Season chicken breasts with the Italian seasoning, salt, and pepper.<br>3) Warm the olive oil over medium-high heat in a large nonstick skillet. Once it’s shimmering, swirl the pan to evenly distribute. Add the chicken and leave it undisturbed for 5-7 minutes, until the bottom is golden-brown. Flip over and add in 1 tablespoon of butter between them, picking up the pan to give it a gentle swirl to distribute. Continue cooking for another 5-7 minutes (or an internal temperature reaches 165 degrees F<br>4) Transfer the chicken to a cutting board and let rest for 3 minutes. Cut into 1/2-inch-thick slices. Tent with foil while you prepare the sauce.<br>5) Make the Alfredo sauce: In the same pan, over medium-low heat, add the butter and cream; whisk until butter has melted.<br>6) Add in the minced garlic, garlic powder, Italian seasoning, salt, and pepper; whisk until combined and smooth.<br>7) Bring to a gentle simmer (do not boil) and cook for 3-4 minutes, whisking constantly, until it starts to thicken.<br>8) Stir in the parmesan cheese just until melted and the sauce is smooth. (If the sauce ends up too thick, add some of the reserved pasta cooking water, a few tablespoons at a time, to thin it out.)<br>9) Assemble: Take sauce off the heat and immediately toss with the cooked fettuccine noodles.<br>10) Divide the pasta among serving bowls and top with a few slices of chicken. Garnish with parsley, more Parmesan, and black pepper if desired.<br>"), 
new Recipe("Greek Salad", "1 English cucumber, cut lengthwise, seeded, and sliced ¼-inch thick<br>1 green bell pepper, chopped into 1-inch pieces<br>2 cups halved cherry tomatoes<br>5 ounces feta cheese, cut into ½ inch cubes*<br>⅓ cup thinly sliced red onion<br>⅓ cup pitted Kalamata olives<br>1 cup greek dressing", "On a large platter, arrange the cucumber, green pepper, cherry tomatoes, feta cheese, red onions, and olives. Drizzle with the dressing and very gently toss. Sprinkle with a few generous pinches of oregano and top with the mint leaves. Season to taste and serve."), 
new Recipe("Sweet Potato Pie", "1 (1 pound) sweet potato, with skin<br>½ cup butter, softened<br>1 cup white sugar<br>½ cup milk<br>2 large eggs<br>½ teaspoon ground nutmeg<br>½ teaspoon ground cinnamon<br>1 teaspoon vanilla extract<br>1 (9 inch) unbaked pie crust", "1) Place whole sweet potato in pot and cover with water; bring to a boil. Boil until tender when pierced with a fork, 40 to 50 minutes.<br>2) Preheat the oven to 350 degrees F (175 degrees C).<br>3) Remove sweet potato from the pot and run under cold water. Remove and discard skin.<br>4) Break sweet potato flesh apart and place in a bowl. Add butter and mix with an electric mixer until well combined.<br>5) Add sugar, milk, eggs, nutmeg, cinnamon, and vanilla; beat on medium speed until mixture is smooth.<br>6) Pour filling into unbaked pie crust.<br>7) Bake in the preheated oven until a knife inserted in the center comes out clean, 55 to 60 minutes.<br>8) Remove from the oven and let cool before serving.")];

function addNewRecipe(){
    let cancelBtn = document.getElementById("addCancel");
    let recipeCard = document.getElementById("recipeCard");
    cancelBtn.onclick = function(){
        addRecipeDiv.style.display = "none";
        recipeCard.style.display = "block";
        document.getElementById("titleInput").value = "";
        document.getElementById("ingredientInput").value = "";
        document.getElementById("instructionsInput").value ="";
        return;
    }

    addRecipeDiv.style.display = "block";
    recipeModules.style.display = "none";
    let submitBtn = document.getElementById("submitRecipe");
    submitBtn.onclick = submitRecipe;      
}

function submitRecipe(){
    /*make a new div*/
    const newRecipe = document.createElement("div");

    /*add this attribute so the div can be edited*/
    newRecipe.onclick = function(){
        showRecipeCard(newRecipe);
    }
    //newRecipe.setAttribute("onclick", editRecipe(newRecipe));

    /*retrieve form input*/
    let titleInput = document.getElementById("titleInput").value;
    let ingredientInput = document.getElementById("ingredientInput").value;
    let instructionsInput = document.getElementById("instructionsInput").value;
    ingredientInput = ingredientInput.replaceAll("\n","<br>");
    instructionsInput = instructionsInput.replaceAll("\n","<br>");

    /*write the html for the new recipe module and style it via the recipe module class*/
    newRecipe.className = "recipeModule";
    newRecipe.innerHTML = `
        <label class="recipeName">${titleInput}</label>
        <img class= "recipePics" src="./images/produce.png">
        <p class="ingredients">${ingredientInput}</p>
        <p class="instructions">${instructionsInput}</p>
    `;

    /*append the new recipe module to the list of modules*/
    recipeModules.appendChild(newRecipe);
    addRecipeDiv.style.display = "none";
    recipeModules.style.display = "block";
    recipeArray.push(new Recipe(titleInput, ingredientInput, instructionsInput));
    document.getElementById("titleInput").value = "";
    document.getElementById("ingredientInput").value = "";
    document.getElementById("instructionsInput").value = "";
    console.log(recipeArray);
}

function editRecipe(div){
    let recipeCard = document.getElementById("recipeCard");
    cancelBtn = document.getElementById("editCancel");
    cancelBtn.onclick = function(){
        editRecipeDiv.style.display = "none";
        recipeModules.style.display = "block";
        recipeCard.style.display = "none";
        document.getElementById("titleEdit").value = "";
        document.getElementById("ingredientEdit").value = "";
        document.getElementById("instructionsEdit").value ="";
        return;
    }

    deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.onclick = function(){
        editRecipeDiv.style.display = "none";
        recipeModules.style.display = "block";
        recipeCard.style.display = "none";
        div.remove();
        replaceIndex = recipeArray.findIndex(b => b === div);
        if(replaceIndex !== -1){
            recipeArray.splice(replaceIndex, 1);
        }
        console.log(recipeArray);
    }
    
   
    /*bring up the edit popup*/
    editRecipeDiv.style.display = "block";
    recipeCard.style.display = "none";
    let replaceIndex;

    
    /*get input elements*/
    
    let titleInput = document.getElementById("titleEdit");
    let ingredientInput = document.getElementById("ingredientEdit");
    let instructionsInput = document.getElementById("instructionsEdit");
    
    /*use this to put the values of the clicked on recipe into the form*/
    
        recipeArray.forEach(a => {
        if (a.title === div.getElementsByTagName("label")[0].textContent){
            replaceIndex = recipeArray.findIndex(b => b === a);
            titleInput.value = a.title;
            ingredientInput.value = a.ingredients;
            instructionsInput.value = a.instructions;
        }
    })

    

    document.getElementById('submitEdit').onclick = function(){
        saveRecipe(div, replaceIndex);
    }
}




function saveRecipe(div, replaceIndex){
    console.log("ran save?");
    /*grab the new updated values from the div*/
    
    let titleInput = document.getElementById("titleEdit").value;
    let ingredientInput = document.getElementById("ingredientEdit").value;
    let instructionsInput = document.getElementById("instructionsEdit").value;
    ingredientInput = ingredientInput.replaceAll("\n","<br>");
    instructionsInput = instructionsInput.replaceAll("\n","<br>");


    
    div.innerHTML = `
        <label class="recipeName">${titleInput}</label>
        <img class= "recipePics" src="./images/produce.png">
        <p class="ingredients">${ingredientInput}</p>
        <p class="instructions">${instructionsInput}</p>
    `;

    
    /*update the global array*/
    recipeArray[replaceIndex] = new Recipe(document.getElementById("titleEdit").value, document.getElementById("ingredientEdit").value, document.getElementById("instructionsEdit").value);


    /*append the new recipe module to the list of modules*/
    let recipeCard = document.getElementById("recipeCard");
    
    editRecipeDiv.style.display = "none";
    recipeCard.style.display = "block";
    
    console.log(recipeArray);
    

}

function showRecipeCard(div){
    let recipeCard = document.getElementById("recipeCard");
    let editBtn = document.getElementById("editButton");
    editBtn.onclick = function(){
        editRecipe(div);
    }
    
    recipeCard.style.display = "block";
    recipeModules.style.display ="none";
    console.log(div.getElementsByTagName("label")[0].textContent);
    recipeArray.forEach(a => {
        if (a.title === div.getElementsByTagName("label")[0].textContent){
            document.getElementById("showTitle").innerHTML = a.title;
            document.getElementById("showIngredients").innerHTML = a.ingredients;
            document.getElementById("showInstructions").innerHTML = a.instructions;
        }
    })
}

function backBtn(){
    let recipeCard = document.getElementById("recipeCard");
    
    recipeCard.style.display = "none";
    recipeModules.style.display ="block";
    document.getElementById("showTitle").innerHTML = "";
    document.getElementById("showIngredients").innerHTML = "";
    document.getElementById("showInstructions").innerHTML = "";

    console.log("ran");
}

function showFilterMenu(){
    let filterMenu = document.getElementById("filterMenu");
    let vegRecipes = document.getElementById("vegRecipes");
    let janesFaves = document.getElementById("janesFaves");
    filterMenu.style.display = "none";
    vegRecipes.style.display = "none";
    janesFaves.style.display = "none";
    filterMenu.style.display = "block";
    recipeModules.style.display = "none";

}

function showAll(){
    let filterMenu = document.getElementById("filterMenu");
    let vegRecipes = document.getElementById("vegRecipes");
    let janesFaves = document.getElementById("janesFaves");
    filterMenu.style.display = "none";
    vegRecipes.style.display = "none";
    janesFaves.style.display = "none";
    recipeModules.style.display = "block";
}

function showVeg(){
    let filterMenu = document.getElementById("filterMenu");
    let vegRecipes = document.getElementById("vegRecipes");
    let janesFaves = document.getElementById("janesFaves");
    filterMenu.style.display = "none";
    janesFaves.style.display = "none";
    recipeModules.style.display = "none";
    vegRecipes.style.display = "block";
}


function showJane(){
    let filterMenu = document.getElementById("filterMenu");
    let vegRecipes = document.getElementById("vegRecipes");
    let janesFaves = document.getElementById("janesFaves");
    filterMenu.style.display = "none";
    recipeModules.style.display = "none";
    vegRecipes.style.display = "none";
    janesFaves.style.display = "block";
}
