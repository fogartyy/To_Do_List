import './App.css';

//todolist container and create todolist
import { TodoListContainer, CreateTodoItem } from './components/todolist';


function App() {
  return (
    <div className="App">
      <TodoListContainer />
    </div>
  );
}

export default App;
