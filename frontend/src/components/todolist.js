import { createTodo, readTodos, updateTodo, deleteTodo } from "../api/crud";
import React, { Component } from 'react'
//import status
import { loadingStatus, doneStatus,failedStatus } from './status';

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
            loading: false,
            isEditing: false,
            title: this.props.todo.title,
            description: this.props.todo.description,
            completed: this.props.todo.completed,
            status: "",
            promise: this.props.todo.promise,
            id: this.props.todo.id
        }
    }


    componentDidMount() {
      //if promise is not null
      if (this.state.promise) {
        //set status to loading
        this.setState({
          status: loadingStatus(),
          loading: true
        })
        //wait for promise to resolve
        this.state.promise.then((data) => {
          console.log(data);
          if (data.status === 201) {
            this.setState({
              status: doneStatus(),
              id: data.data.id,
              loading: false
            });
          } else {
            this.setState({
              status: failedStatus()
            });
          }
        });
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
        this.setState({
            isEditing: false,
            status: loadingStatus()
        })
        updateTodo(this.props.todo.id, {
            title: this.state.title,
            description: this.state.description
        }).then((data) => {
            //check if 200 status code
            if (data.status === 200) {
                this.setState({
                    status: doneStatus()
                })
            }
            else {
                this.setState({
                    status: failedStatus()
                })
            }
        })
    }

    deleteTodoItem = () => {
        deleteTodo(this.state.id).then(() => {
            this.props.refreshData();
        })
    }

    handleComplete = () => {
        this.setState({
          completed: true,
          status: loadingStatus()
        })

        updateTodo(this.state.id, {
          title: this.state.title,
          description: this.state.description,
          completed: true
        }).then((data) => {
          //check if 200 status code
          console.log(data.status);
          if (data.status === 200) {
            this.setState({
              status: doneStatus()
            })
          }
          else {
            this.setState({
              status: failedStatus()
            })
          }
        }
        )
    }

    handleUndo = () => {
      this.setState({
          completed: false,
          status: loadingStatus()
      })
      updateTodo(this.state.id, {
          title: this.state.title,
          description: this.state.description,
          completed: false
      }).then((data) => {
          //check if 200 status code
          if (data.status === 200) {
              this.setState({
                  status: doneStatus()
              })
          }
          else {
              this.setState({
                  status: failedStatus()
              })
          }
      }
      )
  }


    //set background color to green if completed is true
    
    backGroundColor = () => {
        if (this.state.completed) {
            return {backgroundColor: "#15690056"}
        }
    }



    render() {
      return (
        this.state.loading ? (
          <li className="grid container" style={{ gridTemplateColumns: "35% 35% auto auto", marginTop: "20px", opacity:"0.4"}}>
                {this.state.status}
                <p className="text">{this.props.todo.title}</p>
                <p className="text">{this.props.todo.description}</p>              
              </li>
        ) : (
          this.state.isEditing ? (
            <form className="grid container" style={{ gridTemplateColumns: "auto auto auto", marginTop: "20px" }}>
              <input style={{ textAlign: "center" }} id="title" type="text" required value={this.state.title} onChange={this.handleChange} />
              <input style={{ textAlign: "center" }} id="description" type="text" value={this.state.description} onChange={this.handleChange} />
              <p className="button rounded" onClick={this.handleUpdate}>Update</p>
            </form>
          ) : (
            this.state.completed ? (
              // Render completed todo item with green background
              <li className="grid container" style={{ gridTemplateColumns: "35% 35% auto auto", marginTop: "20px", ...this.backGroundColor() }}>
                {this.state.status}
                <p className="text">{this.state.title}</p>
                <p className="text">{this.state.description}</p>
                <p className="button rounded" onClick={this.handleUndo}>Undo</p>
                <p className="button rounded" onClick={() => this.deleteTodoItem()}>X</p>
                
              </li>
            ) : (
                <li className="grid container" style={{ gridTemplateColumns: "35% 35% auto auto auto", marginTop: "20px" }}>
                  {this.state.status}
                  <p className="text">{this.state.title}</p>
                <p className="text">{this.state.description}</p>
                  <p className="button rounded" onClick={this.handleComplete}>Done</p>
                  <p className="button rounded" onClick={this.handleEdit}>Edit</p>
                  <p className="button rounded" onClick={() => this.deleteTodoItem()}>X</p>
                </li>
            )
          )
        )
      );
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
    });
  }

  render() {
    return (
        <div style={{width:"50%"}} className="center">
            <h1 className='grid text'>To-Do List</h1>
            <CreateTodoItem refreshData={this.refreshData} container={this} />
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
    //add data to todo container
    this.props.container.setState({
      todos: [...this.props.container.state.todos, {
        title: this.state.title,
        description: this.state.description,
        completed: false,
        promise: createTodo({
          title: this.state.title,
          description: this.state.description
        })
      }]
    })

    this.setState({
      title: "",
      description: ""
    })
  }

  render() {
    return (
      <form className="grid createtodolist" style={{gridTemplateColumns: "auto auto auto", marginBottom:"20px", marginTop:"20px"}} onSubmit={this.handleSubmit}>
        <input style={{textAlign:"center"}} required id="title" type="text" value={this.state.title} onChange={this.handleChange} placeholder="Enter To-do Item Title" />
        <input style={{textAlign:"center"}} id="description" type="text" value={this.state.description} onChange={this.handleChange} placeholder="Enter To-do Item Description" />
        <input className="button" type="submit" value="Add" />
      </form>
    )
  }
}
