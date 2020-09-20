window.addEventListener('load', start);

let register = {
  tasks: [],
  descriptions: []
};
let input;
let textarea;
let currentIndex;
let isEditing = false;

function start() {
  input = document.querySelector('input');
  textarea = document.querySelector('textarea')

  preventFormReload();
  activateInput();
  render();
}

function activateInput() {
  input.focus();
}

function preventFormReload() {
  function handleFormReload(event) {
    event.preventDefault();
  }

  function updateRegister(newTask, newDesc) {
    register.tasks[currentIndex] = newTask;
    register.descriptions[currentIndex] = newDesc;
    render();
  }

  function insertRegister(newTask, newDesc) {
    register.tasks.push(newTask);
    register.descriptions.push(newDesc); 
    render();
  }

  function handleTyping() {
    if (input.value !== '') {
      if (isEditing) {
        updateRegister(input.value, textarea.value);
      } else {
        insertRegister(input.value, textarea.value);
      }

      isEditing = false;
    }
  }

  document.querySelector('form')
    .addEventListener('submit', event => {
      handleFormReload(event);
      handleTyping();
      console.log(register)
    });
}

function render() {
  function deleteButton(i, button) {
    function deleteRegister() {
      register.tasks.splice(i, 1);
      register.descriptions.splice(i, 1);
      render();
    }

    button.addEventListener('click', deleteRegister)
  }

  function editButton(task, desc, button, i) {
    function editRegister() {
      input.value = task;
      textarea.value = desc;
      input.focus();
      isEditing = true;
      currentIndex = i;
    }

    button.addEventListener('click', editRegister)
  }

  const tasksDiv = document.querySelector('.tasks');
  tasksDiv.innerHTML = '';

  for (let i = 0; i < register.tasks.length; i++) {
    
    const taskSingleDiv = document.createElement('div');
    taskSingleDiv.classList.add('task-single');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    
    const taskTitle = document.createElement('h3');
    taskTitle.textContent = register.tasks[i];
    const taskDesc = document.createElement('p');
    taskDesc.textContent = register.descriptions[i];
    
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options')
    
    const xImage = document.createElement('img');
    xImage.setAttribute('src', 'https://svgshare.com/i/PpZ.svg');
    
    const editSpan = document.createElement('span');
    editSpan.textContent = 'Edit';

    deleteButton(i, xImage);
    editButton(register.tasks[i], register.descriptions[i], editSpan, i)
    
    tasksDiv.appendChild(taskSingleDiv);
    taskSingleDiv.appendChild(contentDiv);
    taskSingleDiv.appendChild(optionsDiv);
    contentDiv.appendChild(taskTitle);
    contentDiv.appendChild(taskDesc);
    optionsDiv.appendChild(xImage);
    optionsDiv.appendChild(editSpan);
    
  }
  clearForm();
}

function clearForm() {
  input.value = '';
  textarea.value = '';
}