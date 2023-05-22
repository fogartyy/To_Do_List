const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());
var connection;

function connectWithRetry() {
  const connect = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'todolist',
  });

  connect.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      console.log('Retrying in 2 seconds...');
      setTimeout(connectWithRetry, 2000); // Retry after 2 seconds
    } else {
      console.log('Connected to the database');
      connection = connect;
    }
  });
}

connectWithRetry();

// ...



// Create a new todo
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO todos (title, description) VALUES (?, ?)';
    connection.query(query, [title, description], (err, result) => {
      if (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Failed to create todo' });
      } else {
        res.status(201).json({ id: result.insertId });
      }
    });
  });
  
  // Read all todos
  app.get('/todos', (req, res) => {
    const query = 'SELECT * FROM todos';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving todos:', err);
        res.status(500).json({ error: 'Failed to retrieve todos' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Update a todo
  app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    const query = 'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?';
    connection.query(query, [title, description, completed, id], (err) => {
      if (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Failed to update todo' });
      } else {
        res.status(200).json({ message: 'Todo updated successfully' });
      }
    }
    );
    
  });
  
  // Delete a todo
  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM todos WHERE id = ?';
    connection.query(query, [id], (err) => {
      if (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ error: 'Failed to delete todo' });
      } else {
        res.status(200).json({ message: 'Todo deleted successfully' });
        }
    });
    });



    const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

    
  
