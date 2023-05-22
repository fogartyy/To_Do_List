CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (title, description) VALUES ('Make To-Do List Frontend', 'Build Frontend');
INSERT INTO todos (title, description) VALUES ('Make To-Do List Backend', 'Build Backend');
INSERT INTO todos (title, description) VALUES ('Make To-Do List Database', 'Build Database');
