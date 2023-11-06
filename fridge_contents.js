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


// Fridge Location
FREEZER = 0
LAYER_1_REF = 1
LAYER_2_REF = 2
LAYER_3_REF = 3

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

let FRIDGE_CONTENTS = []
if (localStorage.getItem("Initialized") == null) {
    initialize()
}
FRIDGE_CONTENTS = JSON.parse(localStorage.getItem("Fridge_Contents")); // null if not found


function initialize() {
    // initialize fridge contents
    FRIDGE_CONTENTS = []
    FRIDGE_CONTENTS.push(new foodItem("Salmon",fish,4,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Trout",fish,3,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Bass",fish,2,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Pork",meat,3,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Steak",meat,5,FREEZER))
    FRIDGE_CONTENTS.push(new foodItem("Yogurt",dairy,3,LAYER_3_REF))
    FRIDGE_CONTENTS.push(new foodItem("Milk",dairy,1,LAYER_3_REF))

    localStorage.setItem("Initialized", true)
    localStorage.setItem("Fridge_Contents",JSON.stringify(FRIDGE_CONTENTS))
    console.log("initialized!")
}

function load_fridge_contents(FRIDGE_CONTENTS) {

    let i = 0
    while (i < FRIDGE_CONTENTS.length) {
        var lab = document.createElement("label");
        lab.className = "bottomtext"
        lab.textContent = FRIDGE_CONTENTS[i].name + " - " + FRIDGE_CONTENTS[i].amount;

        var img = document.createElement("img");
        img.className = "center"
        img.src = FRIDGE_CONTENTS[i].icon;

        var div = document.createElement("div");
        div.className="smallsquare"
        div.appendChild(img)
        div.appendChild(lab)
        div.setAttribute('onclick',"open_editor(\""+FRIDGE_CONTENTS[i].name+"\", "+FRIDGE_CONTENTS[i].amount+", "+FRIDGE_CONTENTS[i].position+")")
        modules_div = document.querySelector(".content #content"+FRIDGE_CONTENTS[i].position).childNodes[1]
        
        modules_div.insertBefore(div,modules_div.childNodes[0])
        i++;
    }
}

function open_editor(name, amt, layer) {
    console.log(name, amt, layer)
    let i = 0;
    let item = -1;
    while(i<FRIDGE_CONTENTS.length) {
        if (FRIDGE_CONTENTS[i].name == name && FRIDGE_CONTENTS[i].position == layer) {
            item = i
            break;
        }
        i++;
    }
    modal.children[0].children[0].src = FRIDGE_CONTENTS[item].icon;
    modal.children[0].children[1].textContent = FRIDGE_CONTENTS[item].name;
    modal.children[0].children[2].children[1].textContent = FRIDGE_CONTENTS[item].amount;

    modal.children[0].children[2].children[0].setAttribute('onclick',"add_item(\"" + name + "\","+layer+"," + 1 + ")");
    modal.children[0].children[2].children[2].setAttribute('onclick',"add_item(\"" + name + "\","+layer+"," + -1 + ")");
    
    modal.style.display = "block";
    
    //todo: edit onclick for + and - icons.
    

    console.log(item)
}

function add_item(name, layer, amt) {
    let i = 0;
    let item = -1;
    while(i<FRIDGE_CONTENTS.length) {
        if (FRIDGE_CONTENTS[i].name == name && FRIDGE_CONTENTS[i].position == layer) {
            item = i
            break;
        }
        i++;
    }
    FRIDGE_CONTENTS[item].amount+=amt;
    modal.children[0].children[2].children[1].textContent = FRIDGE_CONTENTS[item].amount;
}

var modal = document.getElementById("myModal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      
      // todo: update localstorage with fridge data, refresh page.
      location.reload();
    }
    FRIDGE_CONTENTS = FRIDGE_CONTENTS.filter(function (entry) {
        return entry.amount > 0;
    })
    localStorage.setItem("Fridge_Contents",JSON.stringify(FRIDGE_CONTENTS))
}


function add_content_to_fridge(layer) {
    modal.style.display = "block";
}  


// This is the script for the bottom dashboard
function goto_home_page() {
    location.href = './home_screen.html';
}
function goto_list_page() {
    location.href = './shoppinglist_screen.html';
}
function goto_fridge_page() {
    location.href = './fridge_contents.html';
}
function goto_profile_page() {
    location.href = './profile.html';
}
function goto_recipe_page() {
    location.href = './recipe.html';
}



load_fridge_contents(FRIDGE_CONTENTS);