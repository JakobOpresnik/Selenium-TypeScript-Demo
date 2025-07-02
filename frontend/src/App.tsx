import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import TodoList from './TodoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/todolist' element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
