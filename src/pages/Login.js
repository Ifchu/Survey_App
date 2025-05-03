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
 
  // Стилове дефинирани като обекти
    const styles = {
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(145deg, #eef1f5, #d4dce4)',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      background: '#fff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
    },
    input: {
      padding: '14px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.container}>Вход</h2>
      <form style={styles.container} onSubmit={handleSubmit}>
        <div>
          <label>Имейл:</label>
          <input type="email" ref={emailRef} required />
        </div>

        <div>
          <label>Парола:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        <button type="submit"  style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>Влез</button>
      </form>
    </div>
  );
};

export default Login;
