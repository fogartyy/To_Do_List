import { createTodo, readTodos, updateTodo, deleteTodo } from "../api/crud";
import React, { Component } from 'react'

const TodoList = (props) => {
  return (
    <ul className="list-group">
      {props.todos.map(todo => {
        return <TodoListItem todo={todo} key={todo.id} deleteTodoItem={props.deleteTodoItem} />
      })}
    </ul>
  )
}

const TodoListItem = (props) => {
  return (
    <li className="grid container" style={{gridTemplateColumns: "35% 35% auto auto auto", marginTop:"20px"}}>
      <p className="text">{props.todo.title}</p>
      <p className="text">{props.todo.description}</p>
      <p className="button rounded" onClick={() => props.deleteTodoItem(props.todo.id)}>Done</p>
      
      <p className="button rounded" onClick={() => props.deleteTodoItem(props.todo.id)}>Edit</p>

      <p className="button rounded" onClick={() => props.deleteTodoItem(props.todo.id)}>X</p>
    </li>
  )
}

export class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    readTodos().then(data => {
      this.setState({
        todos: [...data]
      });

      console.log(data);
    });
  }

  deleteTodoItem = (id) => {
    deleteTodo(id).then(() => {
      this.refreshData();
    })
  }

  render() {
    return (
        <div style={{width:"50%"}} className="center">
            <CreateTodoItem refreshData={this.refreshData} />
        <TodoList todos={this.state.todos} deleteTodoItem={this.deleteTodoItem} />
        </div>
    )
  }
}

export class CreateTodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    createTodo({
      title: this.state.title,
      description: this.state.description
    }).then(() => {
      this.props.refreshData(); // Use the refreshData prop passed from the parent component
    })

    this.setState({
      title: "",
      description: ""
    })
  }

  render() {
    return (
      <form className="grid" style={{gridTemplateColumns: "auto auto auto", marginBottom:"20px", marginTop:"20px"}} onSubmit={this.handleSubmit}>
        <input style={{textAlign:"center"}} id="title" type="text" value={this.state.title} onChange={this.handleChange} placeholder="Enter To-do Item Title" />
        <input style={{textAlign:"center"}} id="description" type="text" value={this.state.description} onChange={this.handleChange} placeholder="Enter To-do Item Description" />
        <input className="button" type="submit" value="Add" />
      </form>
    )
  }
}
