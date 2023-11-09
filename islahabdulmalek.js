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

const toggleBtn = document.querySelector('#toggleBtn');
const divList = document.querySelector('.listHolder');



toggleBtn.addEventListener('click', () => {
  if (divList.style.display === 'none') {
    divList.style.display = 'block';
    toggleBtn.innerHTML = 'Hide List';
  } else {
    divList.style.display = 'none';
    toggleBtn.innerHTML = 'Show List';
  }
});


const addInput = document.querySelector('#addInput');
const addBtn = document.querySelector('#addBtn');

function addLists() {
  if (addInput.value === '') {
    alert('Enter the item name please!!');
  } else {
    const ul = divList.querySelector('ul');
    const li = document.createElement('li');
    li.innerHTML = addInput.value;
    addInput.value = '';
    ul.appendChild(li);
    createBtn(li);
  }
}

// add list when clicked on add item button
addBtn.addEventListener('click', () => {
  addLists();
});

// add list when pressed enter
addInput.addEventListener('keyup', (event) => {
  if(event.which === 13) {
    addLists();
  }
});


const listUl = document.querySelector('.list');
const lis = listUl.children;

function createBtn(li) {
  // create remove button
  const remove = document.createElement('button');
  remove.className = 'btn-icon remove';
  li.appendChild(remove);

   
   const down = document.createElement('button');
   down.className = 'btn-icon decrease';
   li.appendChild(down);
 

   const up = document.createElement('button');
   up.className = 'btn-icon increase';
   li.appendChild(up);

  return li;
}

// loop to add buttons in each li
for (var i = 0; i < lis.length; i++) {
  createBtn(lis[i]);
}



divList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.className === 'btn-icon remove') {
      ul.removeChild(li);
    }else if (button.className === 'btn-icon increase') {
        myAmount = myAmount + 1;
        var element = document.getElementById("amount");
        element.innerHTML = myAmount;
      } else if (button.className === 'btn-icon up') {
        const prevLi = li.previousElementSibling;
        if (prevLi) {
          ul.insertBefore(li, prevLi);
        }
      }
  }
});
