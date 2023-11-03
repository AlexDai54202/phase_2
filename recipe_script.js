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

let recipeArray = [new Recipe("Spaghetti", "Bla", "BlaBla")];

function addNewRecipe(){
    cancelBtn = document.getElementById("addCancel");
    cancelBtn.onclick = function(){
        addRecipeDiv.style.display = "none";
        recipeModules.style.display = "block";
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
        editRecipe(newRecipe);
    }
    //newRecipe.setAttribute("onclick", editRecipe(newRecipe));

    /*retrieve form input*/
    let titleInput = document.getElementById("titleInput").value;
    let ingredientInput = document.getElementById("ingredientInput").value;
    let instructionsInput = document.getElementById("instructionsInput").value;

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
}

function editRecipe(div){
    cancelBtn = document.getElementById("editCancel");
    cancelBtn.onclick = function(){
        editRecipeDiv.style.display = "none";
        recipeModules.style.display = "block";
        document.getElementById("titleEdit").value = "";
        document.getElementById("ingredientEdit").value = "";
        document.getElementById("instructionsEdit").value ="";
        return;
    }

    deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.onclick = function(){
        editRecipeDiv.style.display = "none";
        recipeModules.style.display = "block";
        div.remove();
        replaceIndex = recipeArray.findIndex(b => b === div);
        recipeArray.splice(replaceIndex, 1);
    }
    /*bring up the edit popup*/
    editRecipeDiv.style.display = "block";
    recipeModules.style.display = "none";
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
    /*grab the new updated values from the div*/
    
    let titleInput = document.getElementById("titleEdit").value;
    let ingredientInput = document.getElementById("ingredientEdit").value;
    let instructionsInput = document.getElementById("instructionsEdit").value;


    
    div.innerHTML = `
        <label class="recipeName">${titleInput}</label>
        <img class= "recipePics" src="./images/produce.png">
        <p class="ingredients">${ingredientInput}</p>
        <p class="instructions">${instructionsInput}</p>
    `;

    
    /*update the global array*/
    recipeArray[replaceIndex] = new Recipe(document.getElementById("titleEdit").value, document.getElementById("ingredientEdit").value, document.getElementById("instructionsEdit").value);


    /*append the new recipe module to the list of modules*/
    
        editRecipeDiv.style.display = "none";
        recipeModules.style.display = "block";
    
    
    

}


