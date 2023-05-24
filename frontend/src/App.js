import './App.css';

//todolist container and create todolist
import { TodoListContainer} from './components/todolist';


function App() {
  return (
    <div className="App">
      <div data-testid="todo-list-container"><TodoListContainer /></div>
    </div>
  );
}

export default App;
