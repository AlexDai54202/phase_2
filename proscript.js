let ogPerson;
// const currentUrl = window.location.href;
// const pattern = /profiledit.html/;
// if(pattern.test(currentUrl) == true) {
//     var modal = document.getElementById("myModal");
//     var btn = document.getElementById("add");
//     var span = document.getElementsByClassName("close")[0];

//     btn.onclick = function() {
//         modal.style.display = "block";
//     }
    
//     span.onclick = function() {
//         modal.style.display = "none";
//     }
    
//     window.onclick = function(event) {
//         if (event.target == modal) {
//           modal.style.display = "none";
//         }
//     }
// }




class Person {
    constructor(nameIn, levelIn, emailIn, numberIn, allergiesIn, houseIn, notsIn, pplIn) {
        this.name = nameIn;
        this.level = levelIn;
        this.email = emailIn;
        this.number = numberIn;
        this.allergies = allergiesIn;
        this.house = houseIn;
        this.nots = notsIn
        this.ppl = pplIn;
    }

    set nName(newName) {
        this.name = newName;
    }

    set nEmail(newEmail) {
        this.email = newEmail;
    }

    set nNumber(newNum) {
        this.number = newNum;
    }

    set nLevel(newLevel) {
        this.level = newLevel;
    }
    set nAllergies(newAllergies) {
        this.allergies = newAllergies;
    }

    set nHouse(newHouse) {
        this.house = newHouse;
    }

    set nNots (newNots) {
        this.nots = newNots;
    }

    set nPpl (newPpl) {
        this.ppl = newPpl;
    }
}
window.onload = function() {

    const storedData = localStorage.getItem('ogPersonData');
    if (storedData) {
        ogPerson = JSON.parse(storedData);
    } else {
        ogPerson = new Person("John Smith", "Beginner", "john.smith@gmail.com", "123-456-7890", ["./images/peanut-free.png", "Nut Allergy"], "Home", "On", ["Father", "Mother", "Sarah", "Ben"]);
        localStorage.setItem('ogPersonData', JSON.stringify(ogPerson));
    }
    setValsFromLocalStorage()
}

function removeMem(name) {
    let ind = ogPerson.ppl.indexOf(name);
    ogPerson.ppl.splice(ind, 1);
    setVals2();

}


function setVals2() {
    document.getElementById("nameIn").value = ogPerson.name;
    document.getElementById("cooklevel").value = ogPerson.level;
    document.getElementById("emailIn").value = ogPerson.email;
    document.getElementById("phoneIn").value = ogPerson.number;
    let mems = "";
    for(let i = 0; i < ogPerson.ppl.length; i++) {
        mems += "<div class=\"module\" style=\"text-align: center; margin-right: 6px;\">";
        mems += "<img src=\"./images/person.png\" style=\"width: 80%; padding-top: 20px;\"></img><br>";
        mems += "<button style=\"padding-top: 10px;\" onclick=\"removeMem('";
        mems += ogPerson.ppl[i];
        mems += "')\"><img class=\"remove\" src=\"./images/delete.png\" style=\"width: 20%;\"></img>";
        mems += "</button><label class = \"bottomtext\">";
        mems += ogPerson.ppl[i];
        mems += "</label></div>";
    }
    mems += "<div id=\"addBtn\"class=\"module\" style=\"border: none;\"><button id=\"add\"><img style=\"width: 60%;\" src=\"./images/ADDBUTTON.png\"></img></button></div>";

    document.getElementById("modules2").innerHTML = mems;

    for(let i = 0; i < ogPerson.allergies.length; i++) {
        let checkbox = document.getElementById(ogPerson.allergies[i]);
        if(checkbox) {
            checkbox.checked = true;
        }

    }
    if(ogPerson.house == "Home") {
        let h = document.getElementById("home");
        h.checked = true;

    }
    if(ogPerson.house == "School") {
        let s = document.getElementById("school");
        s.checked = true;
    }

    if(ogPerson.nots == "On") {
        let h = document.getElementById("on");
        h.checked = true;

    }
    if(ogPerson.nots == "Off") {
        let s = document.getElementById("off");
        s.checked = true;
    }

    console.log(ogPerson.ppl);

}

function setVals() {
    
    document.getElementById("name2").innerHTML = ogPerson.name;
    document.getElementById("level2").innerHTML = "Cooking Level: " + ogPerson.level;
    document.getElementById("email").innerHTML = "Email: " + ogPerson.email;
    document.getElementById("number").innerHTML = "Phone Number: " + ogPerson.number;
    let diets = "";
    if(ogPerson.allergies.length == 0) {
        document.getElementById("restrictions").innerHTML = "None"

    } else {
        for(let i = 0; i < ogPerson.allergies.length; i+= 2) {
            let allergy = ogPerson.allergies[i];
            diets += "<div class=\"module\" style=\"text-align: center; margin-right: 6px;\">";
            diets += "<img src=\"" + allergy + "\" style=\"width: 60%;padding-top: 20px; padding-bottom: 30px;\" />";
            diets += "<label class=\"bottomtext\">";
            diets += ogPerson.allergies[i + 1];
            diets += "</label>";


            diets += "</div>"; 
        }
        document.getElementById("restrictions").innerHTML = diets;
    }

    let mems = "";
    for(let i = 0; i < ogPerson.ppl.length; i++) {
        mems += "<div class=\"module\" style=\"text-align: center; margin-right: 6px;\">";
        mems += "<img src=\"./images/person.png\" style=\"width: 80%; padding-top: 20px;\"></img>";
        mems += "<label class = \"bottomtext\">";
        mems += ogPerson.ppl[i];
        mems += "</label></div>";
    }
    document.getElementById("modules3").innerHTML = mems;

    let pic = "";
    if(ogPerson.house == "School") {
        pic += "<label style=\"margin-left: 20px;\" class = \"subtitle\">My Household:</label><img src=\"./images/school.png\" style=\"width: 8%; float: right; margin-bottom: 6px; \" />";
    }
    if(ogPerson.house == "Home") {
        pic += "<label style=\"margin-left: 20px;\" class = \"subtitle\">My Household:</label><img src=\"./images/house.png\" style=\"width: 8%; float: right; margin-bottom: 6px;\" />";
    }
    document.getElementById("homeTy").innerHTML = pic;

    let notsInfo = "" ;
    if(ogPerson.nots == "On") {
        notsInfo += "<label class = \"contact-info\" id=\"notifications\">Notifications: On</label>";
    }
    if(ogPerson.nots == "Off") {
        notsInfo += "<label class = \"contact-info\" id=\"notifications\">Notifications: Off</label>";
        
    }
    document.getElementById("not").innerHTML = notsInfo;
    

}

function updateVals() {
    let nameIn = document.getElementById("nameIn").value;
    console.log(nameIn);
    let emailIn = document.getElementById("emailIn").value;
    let numIn = document.getElementById("phoneIn").value;
    let cooklevel = document.getElementById("cooklevel");
    let levelIn = cooklevel[cooklevel.selectedIndex].value;
    let allergiesIn = [];

    let nuts = document.getElementById("./images/peanut-free.png")
    if(nuts.checked) {
        allergiesIn.push("./images/peanut-free.png");
        allergiesIn.push("Nut Allergy");
    }
    let soy = document.getElementById("./images/soy-free.png")
    if(soy.checked) {
        allergiesIn.push("./images/soy-free.png");
        allergiesIn.push("Soy Allergy");
    }
    let wheat = document.getElementById("./images/gluten-free.png")
    if(wheat.checked) {
        allergiesIn.push("./images/gluten-free.png");
        allergiesIn.push("Gluten Free");
    }
    let eggs = document.getElementById("./images/no-egg.png")
    if(eggs.checked) {
        allergiesIn.push("./images/no-egg.png");
        allergiesIn.push("Egg Allergy");
    }
    let fish = document.getElementById("./images/no-fish.png")
    if(fish.checked) {
        allergiesIn.push("./images/no-fish.png");
        allergiesIn.push("Fish Allergy");
    }
    let shellfish = document.getElementById("./images/no-seafood.png")
    if(shellfish.checked) {
        allergiesIn.push("./images/no-seafood.png");
        allergiesIn.push("Shellfish Allergy");
    }
    let lactose = document.getElementById("./images/lactose-free.png")
    if(lactose.checked) {
        allergiesIn.push("./images/lactose-free.png");
        allergiesIn.push("Diary Free");
    }
    let kosher = document.getElementById("./images/kosher.png")
    if(kosher.checked) {
        allergiesIn.push("./images/kosher.png");
        allergiesIn.push("Kosher");
    }
    let halal = document.getElementById("./images/halal.png")
    if(halal.checked) {
        allergiesIn.push("./images/halal.png");
        allergiesIn.push("Halal");
    }

    let vegan = document.getElementById("./images/vegan.png")
    if(vegan.checked) {
        allergiesIn.push("./images/vegan.png");
        allergiesIn.push("Vegan");
    }

    let veggie = document.getElementById("./images/veggie.png")
    if(veggie.checked) {
        allergiesIn.push("./images/veggie.png");
        allergiesIn.push("Vegetarian");
    }

    let keto = document.getElementById("./images/keto.png")
    if(keto.checked) {
        allergiesIn.push("./images/keto.png");
        allergiesIn.push("Keto");
    }

    let radio = "houseType";
    let type = getSelection(radio);
    let radio2 = "nots"
    let type2 = getSelection(radio2);


    ogPerson.name = nameIn;
    ogPerson.email = emailIn;
    ogPerson.number = numIn;
    ogPerson.level = levelIn;
    ogPerson.allergies = allergiesIn;
    if(type == "School") {
        ogPerson.house = "School"

    }
    if(type == "Home") {
        ogPerson.house = "Home";
    }

    if(type2 == "On") {
        ogPerson.nots = "On"

    }
    if(type2 == "Off") {
        ogPerson.nots = "Off";
    }




    localStorage.setItem('ogPersonData', JSON.stringify(ogPerson));

    
}
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


function getSelection(radioButtonsName) {
    let category = document.getElementsByName(radioButtonsName);

    for (let idx = 0; idx < category.length; idx++) {
        if (category[idx].checked) {
            return category[idx].value;
        }
    }
}

function setValsFromLocalStorage() {
    const storedData = localStorage.getItem('ogPersonData');
    const currentUrl = window.location.href;
    const pattern = /profiledit.html/;
    if (storedData) {
        ogPerson = JSON.parse(storedData);
        if(pattern.test(currentUrl) == true) {
            setVals2();

        } else {
            setVals(); 

        }
        
        
    }
}






