const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = [];
todoForm.addEventListener('submit', addTask);
todoList.addEventListener('click', handleListClick);
function addTask(e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    tasks.push({ task, completed: false });
    renderTasks();
    todoInput.value = '';
  }
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task ${task.completed ? 'completed' : ''}">${task.task}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(listItem);
  });
}

function handleListClick(e) {
  if (e.target.matches('.checkbox')) {
    const index = e.target.parentNode.querySelector('.delete-btn').dataset.index;
    toggleTaskCompletion(index);
  } else if (e.target.matches('.delete-btn')) {
    const index = e.target.dataset.index;
    deleteTask(index);
  }
}

// Toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
