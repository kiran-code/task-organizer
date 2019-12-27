console.log('app.js');

const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

const loadEventListner = () => {

  // DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);
  
  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear all tasks event
  clearButton.addEventListener('click', clearTask);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
};

const addTask =  (e) => {
  e.preventDefault();

  createTaskList(taskInput.value);
  
  loadLocalStoarge(taskInput.value);
  taskInput.value = '';
};

const removeTask = (e) => {
  // console.log(e.target, e.target.parentElement, e.target.parentElement.className);
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

const removeTaskFromLocalStorage = (taskItem) => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const clearTask = (e) => {
  // taskList.innerHTML = '';

  // faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  cleatTasksFromLocalStorage();
}

const cleatTasksFromLocalStorage = () => {
  localStorage.clear();
}

const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((task) => {
      const item = task.firstChild.textContent;

      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
  });
}

const getTasks = () => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    console.log('tasks is null');
    tasks = [];
  } else {
    console.log('tasks is not null');
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    createTaskList(task);
  });
}

const createTaskList = (task) => {

  const li = document.createElement('li');
  li.className = 'collection-item';
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  const i = document.createElement('i');
  i.className = 'fa fa-remove';
  link.appendChild(i);
  li.appendChild(link);
  taskList.appendChild(li);

}

const loadLocalStoarge = (taskItem) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    console.log('tasks is null');
    tasks = [];
  }
  else {
    console.log('tasks is not null');
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(taskItem);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadEventListner();