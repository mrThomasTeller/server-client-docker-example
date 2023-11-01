const todosList = document.getElementById('todos');

// create todo
const form = document.getElementById('new-todo-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const description = formData.get('description');
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description }),
  });
  const data = await res.json();
  form.reset();

  // add todo to list
  const todo = document.createElement('li');
  todo.textContent = data.description;
  todosList.prepend(todo);
});

// load todos
const res = await fetch('/api/todos');
const data = await res.json();
todosList.innerHTML = data.map((todo) => `<li>${todo.description}</li>`).join('');
