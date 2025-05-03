import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext); // Вземаме login от контекста

  const emailRef = useRef();    // Референция към input за имейл
  const passwordRef = useRef(); // Референция към input за парола

  const handleSubmit = async (e) => {
    e.preventDefault(); // Спираме презареждането

    const email = emailRef.current.value;       // Вземаме текущата стойност
    const password = passwordRef.current.value; // на двете полета

    try {
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

      if (response.data.length > 0) {
        const user = response.data[0];
        alert(`Добре дошъл, ${user.name}!`);
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
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имейл:</label>
          <input type="email" ref={emailRef} required />
        </div>

        <div>
          <label>Парола:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        <button type="submit">Влез</button>
      </form>
    </div>
  );
};

export default Login;
