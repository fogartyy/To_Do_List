# To-Do List App


## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)

## Project Overview

The To-Do List App is a web application that allows users to create and manage their daily tasks. Users can register an account, log in, and perform operations such as adding, editing, and deleting tasks. The app provides a simple and intuitive user interface for managing to-do lists efficiently.

## Technologies Used

- Node.js
- Express.js
- MySQL
- React
- Docker
- Docker Compose

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/fogartyy/to-do-list.git
   ```

2. Navigate to the project directory:

   ```shell
   cd to-do-list
   ```

3. Create a `.env` file with the following environment variables:

   ```shell
   # Database
   DB_HOST=mysql
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=todolist
   ```

   Replace `your_password` with your desired MySQL root password.

4. Build and run the Docker containers:

   ```shell
   docker-compose up --build
   ```

   This will start the API server, MySQL database, and the client application.

5. Access the To-Do List App at `http://localhost:3000`.

## Usage

1. Register an account or log in with your existing account.
2. Create a new task by clicking on the "Add Task" button.
3. Edit a task by clicking on the task and modifying the details.
4. Mark a task as completed by checking the checkbox next to it.
5. Delete a task by clicking on the delete button.

## API Documentation

The To-Do List App provides the following API endpoints:

- `GET /todos`: Get all tasks.
- `GET /todos/:id`: Get a specific task by ID.
- `POST /todos`: Create a new task.
- `PUT /todos/:id`: Update a task.
- `DELETE /todos/:id`: Delete a task.

For detailed documentation, refer to the [API Documentation](./docs/api.md) file.

## Database Schema

The To-Do List App uses the following database schema:

Table: todolist
-----------------------------
| Column       | Type       |
-----------------------------
| id           | int        |
| title        | varchar    |
| description  | text       |
| completed    | boolean    |
| createdAt    | timestamp  |
| updatedAt    | timestamp  |
-----------------------------