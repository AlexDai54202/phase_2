// Raw ingredients
const produce = {
    icon: "./images/produce.png"
}
const meat = {
    icon: "./images/meat.png"
}
const fish = {
    icon: "./images/Fish.png"
}
const dairy = {
    icon: "./images/dairy.png"
}
const poultry = {
    icon: "./images/poultry.png"
}
const wine = {
    icon: "./images/wine.png"
}

// Cooked foods
const soup = {
    icon: "./images/soup.png"
}
const spagetti = {
    icon: "./images/spagetti.png"
}

// Person
const person = {
    icon: "./images/person.png"
}



class foodItem {
    constructor(name, icon, amount, position){
        this.name = name
        this.icon = icon.icon;
        this.amount = amount;
        this.position = position;
    }
    
    removeamount(amt) {
        this.amount -= amt;
    }
    addamount(amt) {
        this.amount += amt;
    }
}

class recipe {
    constructor(name, icon, recipetext, ingredients){
        this.name = name
        this.icon = icon.icon;
        this.text = recipetext;
        // ingredients = Json list {Ingredient_Name : Amount}
        this.ingredients = ingredients;
    }
    
    removeingredients() {
        // TODO: Remove Amount from every Ingredient_Name in this.ingredients
    }
}

class friends {
    constructor(name, icon, desc, favoriterecipes){
        this.name = name;
        this.icon = icon.icon;
        this.desc = desc;
        this.favoriterecipes = favoriterecipes;
    }
}


localStorage.clear()
let FRIDGE_CONTENTS = []
if (localStorage.getItem("Initialized") == null) {
    initialize()
}
FRIDGE_CONTENTS = JSON.parse(localStorage.getItem("Fridge_Contents")); // null if not found

function initialize() {
    // initialize fridge contents
    FRIDGE_CONTENTS = []
    FRIDGE_CONTENTS.push(new foodItem("Salmon",fish,4,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Steak",meat,2,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Yogurt",dairy,2,LAYER_3_REF))
    FRIDGE_CONTENTS.push(new foodItem("Milk",dairy,2,LAYER_3_REF))

    localStorage.setItem("Initialized", true)
    localStorage.setItem("Fridge_Contents",JSON.stringify(FRIDGE_CONTENTS))
    console.log("initialized!")
}





// This is the script for the bottom dashboard
function goto_home_page() {
    location.href = './home_screen.html';
}
function goto_list_page() {
    location.href = './shopping_list.html';
}
function goto_fridge_page() {
    location.href = './fridge_contents.html';
}
function goto_profile_page() {
    location.href = './profile.html';
}
function goto_recipe_page() {
    location.href = './recipeList.html';
}
