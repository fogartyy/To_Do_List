import { createTodo, readTodos, updateTodo, deleteTodo } from "../api/crud";
import React, { Component } from 'react'

const TodoList = (props) => {
  return (
    <ul className="list-group">
      {props.todos.map(todo => {
        return <TodoListItem todo={todo} key={todo.id} refreshData={props.refreshData} />
      })}
    </ul>
  )
}

//TodoListItem Class
class TodoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            title: this.props.todo.title,
            description: this.props.todo.description,
            completed: this.props.todo.completed
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleEdit = () => {
        this.setState({
            isEditing: true
        })
    }

    handleUpdate = () => {
        updateTodo(this.props.todo.id, {
            title: this.state.title,
            description: this.state.description
        }).then(() => {
            this.setState({
                isEditing: false
            })
            this.props.refreshData();
            
        })
    }

    deleteTodoItem = (id) => {
        deleteTodo(id).then(() => {
            this.props.refreshData();
        })
    }

    handleComplete = () => {
        console.log(this.props.todo.id);
        updateTodo(this.props.todo.id, {
            title: this.state.title,
            description: this.state.description,
            completed: true
        }).then(() => {
            this.props.refreshData();
        }
        )
    }


    //set background color to green if completed is true
    
    backGroundColor = () => {
        if (this.props.todo.completed === 1) {
            return {backgroundColor: "#15690056"}
        }
    }



    render() {
            return (
                this.state.isEditing ? (
                    <form className="grid container" style={{ gridTemplateColumns: "auto auto auto", marginTop: "20px" }}>
                      <input style={{ textAlign: "center" }} id="title" type="text" value={this.state.title} onChange={this.handleChange} />
                      <input style={{ textAlign: "center" }} id="description" type="text" value={this.state.description} onChange={this.handleChange} />
                      <p className="button rounded" onClick={this.handleUpdate}>Update</p>
                    </form>
                  ) : (
                    this.props.todo.completed ? (
                      // Render completed todo item with green background
                      <li className="grid container" style={{ gridTemplateColumns: "35% 35% auto auto", marginTop: "20px", ...this.backGroundColor() }}>
                        <p className="text">{this.props.todo.title}</p>
                        <p className="text">{this.props.todo.description}</p>
                        <p className="button rounded" onClick={this.handleComplete}>Undo</p>
                        <p className="button rounded" onClick={() => this.deleteTodoItem(this.props.todo.id)}>X</p>
                      </li>
                    ) : (
                      // Render regular todo item
                      <li className="grid container" style={{ gridTemplateColumns: "35% 35% auto auto auto", marginTop: "20px" }}>
                        <p className="text">{this.props.todo.title}</p>
                        <p className="text">{this.props.todo.description}</p>
                        <p className="button rounded" onClick={this.handleComplete}>Done</p>
                        <p className="button rounded" onClick={this.handleEdit}>Edit</p>
                        <p className="button rounded" onClick={() => this.deleteTodoItem(this.props.todo.id)}>X</p>
                      </li>
                    )
                  )
            )
    }
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

  render() {
    return (
        <div style={{width:"50%"}} className="center">
            <CreateTodoItem refreshData={this.refreshData} />
            <TodoList todos={this.state.todos} refreshData={this.refreshData} />
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
