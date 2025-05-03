import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Импортираме контекста за автентикация

const Login = () => {
  // Вземаме функцията login от контекста, за да запазим текущия потребител
  const { login } = useContext(AuthContext);

  // Създаваме референции към полетата за имейл и парола
  const emailRef = useRef();
  const passwordRef = useRef();

  // Обработваме формата при submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Спираме презареждането на страницата

    // Вземаме въведените стойности от input полетата
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      // Изпращаме заявка към backend-а с въведените имейл и парола
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

      // Ако съществува потребител с тези данни
      if (response.data.length > 0) {
        const user = response.data[0];
        alert(`Добре дошъл, ${user.name}!`);
        login(user); // Записваме потребителя в контекста (вход)
      } else {
        alert('Грешен имейл или парола!');
      }
    } catch (error) {
      console.error('Грешка при вход:', error);
      alert('Възникна грешка при опит за вход.');
    }
  };

  // CSS стилове, дефинирани като JS обекти
  const styles = {
    // Центрираме съдържанието по средата на екрана
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(145deg, #eef1f5, #d4dce4)',
      fontFamily: 'Arial, sans-serif',
    },
    // Карта (кутия) със съдържанието
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
    // Заглавие
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
    },
    // Input стилове
    input: {
      padding: '14px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    // Бутон за вход
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
    // Hover цвят при задържане
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* Формата за вход */}
      <form style={styles.card} onSubmit={handleSubmit}>
        {/* Заглавие */}
        <h2 style={styles.title}>Вход</h2>

        {/* Поле за имейл */}
        <div>
          <label>Имейл:</label>
          <input type="email" ref={emailRef} required />
        </div>

        {/* Поле за парола */}
        <div>
          <label>Парола:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        {/* Бутон за вход със стил и hover ефект */}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Влез
        </button>
      </form>
    </div>
  );
};

export default Login;
