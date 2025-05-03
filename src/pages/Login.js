// Updated by Velislav on 3.05
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
	
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Изпращаме заявка към сървъра
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

      if (response.data.length > 0) {
			const user = response.data[0];
			alert(`Добре дошъл, ${user.name}!`);
         // Записваме потребителя в localStorage
		login(user);
      } else {
        alert('Грешен имейл или парола!');
      }
    } catch (error) {
      console.error('Грешка при вход:', error);
      alert('Възникна грешка при опит за вход.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Вход</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary w-100">Влез</button>
      </form>
    </div>
  );
}


export default Login;
