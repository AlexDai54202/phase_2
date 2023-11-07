const addInput = document.querySelector('#addInput');
const addBtn = document.querySelector('#addBtn');

function addLists() {
    if (addInput.value === '') {
      alert('Enter the list name please!!!');
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

    return li;

  }

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
      }
    }
  });