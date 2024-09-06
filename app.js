const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Set the default layout

// In-memory todo list
let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build a to-do app', completed: false }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    todos.push({ id: newId, task: newTask, completed: false });
  }
  res.redirect('/');
});

app.post('/toggle/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  todos = todos.map(todo =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  );
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  todos = todos.filter(todo => todo.id !== todoId);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
