import { useState } from 'react';
import axios from 'axios';





function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password };

      await axios.post('http://localhost:5000/users', newUser);

      alert('Регистрацията е успешна!');
      // Може да пренасочим към login страницата по-късно
    } catch (error) {
      console.error('Грешка при регистрация:', error);
      alert('Възникна грешка при регистрацията.');
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Име</label>
          <input
            type="text"
            className="form-control"
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Имейл</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Парола</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Регистрация</button>
      </form>
    </div>
  );
}

export default Register;