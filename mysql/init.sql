CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (title, description) VALUES ('Task 1', 'This is the description for task 1');
INSERT INTO todos (title, description) VALUES ('Task 2', 'This is the description for task 2');
INSERT INTO todos (title, description) VALUES ('Task 3', 'This is the description for task 3');
