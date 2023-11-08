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
    constructor(name, icon, amount, position, date_of_purchase){
        this.name = name
        this.icon = icon.icon;
        this.amount = amount;
        this.position = position;
        this.date_of_purchase = date_of_purchase;
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
    FRIDGE_CONTENTS.push(new foodItem("Salmon",fish,4,FREEZER,new Date()))
    FRIDGE_CONTENTS.push(new foodItem("Trout",fish,3,FREEZER,new Date()))
    FRIDGE_CONTENTS.push(new foodItem("Bass",fish,2,FREEZER,new Date()))
    FRIDGE_CONTENTS.push(new foodItem("Pork",meat,3,FREEZER,new Date()))
    FRIDGE_CONTENTS.push(new foodItem("Steak",meat,5,FREEZER,new Date()))
    FRIDGE_CONTENTS.push(new foodItem("Yogurt",dairy,3,LAYER_3_REF,new Date()))
    FRIDGE_CONTENTS.push(new foodItem("Milk",dairy,1,LAYER_3_REF,new Date()))

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
        div.className="smallsquare foodItem"
        div.setAttribute("dop", FRIDGE_CONTENTS[i].date_of_purchase)
        div.appendChild(img)
        div.appendChild(lab)
        div.setAttribute('onclick',"open_editor(\""+FRIDGE_CONTENTS[i].name+"\", "+FRIDGE_CONTENTS[i].amount+", "+FRIDGE_CONTENTS[i].position+")")
        modules_div = document.querySelector(".content #content"+FRIDGE_CONTENTS[i].position).childNodes[1]
        
        modules_div.insertBefore(div,modules_div.childNodes[0])
        i++;
    }
}

function open_editor(name, amt, layer) {
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
    
    modal.children[1].children[0].setAttribute('onclick',"remove_item(\"" + name + "\","+layer+")");

    modal.children[0].children[4].value = new Date(FRIDGE_CONTENTS[item].date_of_purchase).toISOString().split('T')[0]

    modal.style.display = "block";
}

function remove_item(name, layer) {
    let i = 0;
    let item = -1;
    while(i<FRIDGE_CONTENTS.length) {
        if (FRIDGE_CONTENTS[i].name == name && FRIDGE_CONTENTS[i].position == layer) {
            item = i
            break;
        }
        i++;
    }
    FRIDGE_CONTENTS[item].amount = 0;
    
    FRIDGE_CONTENTS = FRIDGE_CONTENTS.filter(function (entry) {
        return entry.amount > 0;
    })
    localStorage.setItem("Fridge_Contents",JSON.stringify(FRIDGE_CONTENTS));
    location.reload();
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
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    FRIDGE_CONTENTS = FRIDGE_CONTENTS.filter(function (entry) {
        return entry.amount > 0;
    })
    localStorage.setItem("Fridge_Contents",JSON.stringify(FRIDGE_CONTENTS));
    
    if (event.target == modal || event.target == modal1 || event.target == modal2) {
        modal.style.display = "none";
        
        // todo: update localstorage with fridge data, refresh page.
        location.reload();
    }
}

function increase(amount) {
    modal1.children[0].children[5].children[1].textContent = parseInt(modal1.children[0].children[5].children[1].textContent) + amount;
}
function select_icon(enu) {
    console.log("select icon "+modal1.children[0].children[1].children.length)
    let i = 0;
    while (i < modal1.children[0].children[1].children.length) {
        if (i == enu) {
            console.log("select icon HERE")
            modal1.children[0].children[1].children[i].style.backgroundColor = '#90EE90';
        } else {
            modal1.children[0].children[1].children[i].style.backgroundColor = ''
        }
        i++;
    }
}

function select_icon_filter(enu) {
    let i = 0;
    while (i < modal2.children[0].children[1].children.length) {
        if (i == enu) {
            if (modal2.children[0].children[1].children[i].style.backgroundColor == '') {
                modal2.children[0].children[1].children[i].style.backgroundColor = '#90EE90';
            } else {
                modal2.children[0].children[1].children[i].style.backgroundColor = '';
            }
        }
        i++;
    }
}

function done_filtering() {
    ok_icons = []
    let i = 0
    while (i < modal2.children[0].children[1].children.length) {
        if (modal2.children[0].children[1].children[i].style.backgroundColor != '') {
            ok_icons.push(modal2.children[0].children[1].children[i].children[0].getAttribute("src"))
        }
        i++;
    }
    console.log(ok_icons)
    ok_date = new Date(modal2.children[0].children[3].value)

    items = document.getElementsByClassName("foodItem")
    console.log(items)
    i = 0;
    while (i < items.length) {
        if (ok_icons.includes(items[i].children[0].getAttribute("src")) && (new Date(items[i].getAttribute("dop"))) <= ok_date) {
            items[i].style.display = ""
        } else {
            items[i].style.display = "none"
        }
        i++;
    }
    modal2.style.display = "none"
}


function sumbit_form() {
    let i = 0;
    let icon = "";
    while (i < modal1.children[0].children[1].children.length) {
        if (modal1.children[0].children[1].children[i].style.backgroundColor != '') {
            icon = modal1.children[0].children[1].children[i].children[0].getAttribute("src")
            break;
        }
        i++;
    }
    amount = parseInt(modal1.children[0].children[5].children[1].textContent);
    item_name = modal1.children[0].children[3].value;
    date = modal1.children[0].children[7].value;
    if (amount > 0) {
        FRIDGE_CONTENTS.push(new foodItem(item_name, {'icon':icon}, amount, LAYER_TO_ADD, new Date(date)));
    }
    localStorage.setItem("Fridge_Contents",JSON.stringify(FRIDGE_CONTENTS))
    location.reload();
}

function open_filter() {
    modal2.style.display = "block"
    modal2.children[0].children[3].value = new Date().toISOString().split('T')[0]
}


var LAYER_TO_ADD = 0;
function add_content_to_fridge(layer) {
    modal1.style.display = "block";
    modal1.children[0].children[7].value = new Date().toISOString().split('T')[0]
    LAYER_TO_ADD = layer
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

