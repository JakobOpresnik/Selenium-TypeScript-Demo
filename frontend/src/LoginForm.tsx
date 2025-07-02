import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Error = {
  name?: string;
  age?: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [errors, setErrors] = useState<Error>({});

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required!';
    if (!age || +age <= 0) newErrors.age = 'Age must be a positive number!';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Name: ${name}, Age: ${age}`);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form id='login-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <br />

        <div>
          <label htmlFor='age'>Age:</label>
          <input
            id='age'
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
        </div>
        <br />

        <button type='submit'>Submit</button>
        <button onClick={() => navigate('/todolist')}>Go to Todo List</button>
      </form>
    </div>
  );
}

export default LoginForm;
