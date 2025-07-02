import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = (e: React.FormEvent): void => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  const removeTodo = (index: number): void => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          id='todo-input'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a todo'
        />
        <button id='add-todo' type='submit'>
          Add
        </button>
        <button onClick={() => navigate('/')}>Go back</button>
      </form>

      <ul id='todo-list'>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{' '}
            <button onClick={() => removeTodo(index)} className='delete-todo'>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
