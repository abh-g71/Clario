// script.js

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
  updateTaskCount(); // ✅ Count on load
};

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task !== '') {
    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = '';
    updateTaskCount(); // ✅ Count on add
  }
});

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.textContent = task;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.onclick = () => {
    li.remove();
    removeTask(task);
    updateTaskCount(); // ✅ Count on delete
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ✅ Dynamic task count display
function updateTaskCount() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const countText = tasks.length === 0
    ? "No tasks left 🎉"
    : `You have ${tasks.length} task${tasks.length > 1 ? 's' : ''}`;
  document.getElementById('task-count').textContent = countText;
}

// Clear All Tasks
document.getElementById('clear-tasks').addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    localStorage.removeItem('tasks');
    taskList.innerHTML = '';
    updateTaskCount(); // ✅ Update task count to zero
  }
});
