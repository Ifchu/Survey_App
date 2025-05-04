import React, { useRef } from 'react';
import axios from 'axios';

function Register() {
  // Създаваме препратки към полетата чрез useRef (директен достъп до input елементите)
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // Основна функция за регистрация
  async function handleRegister(e) {
    e.preventDefault(); // Спираме презареждането на страницата при submit

    // Вземаме стойностите директно от полетата
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      // Създаваме обект на новия потребител
      const newUser = { name, email, password };

      // Изпращаме POST заявка към бекенда (примерно локален сървър)
      await axios.post('http://localhost:5000/users', newUser);

      // Потвърждение за успешна регистрация
      alert('Регистрацията е успешна!');

      
    } catch (error) {
      // Ако възникне грешка, я показваме в конзолата и на потребителя
      console.error('Грешка при регистрация:', error);
      alert('Възникна грешка при регистрацията.');
    }
  }

  // Дефинираме стиловете като JavaScript обекти (вместо външен CSS файл)
  const styles = {
    // Централизиране на формата по средата на екрана
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(145deg, #eef1f5, #d4dce4)', // модерен фон
      fontFamily: 'Arial, sans-serif',
    },
    // Карта (кутия), която съдържа формата
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
    // Заглавие на формата
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
    },
    // Стил за input полетата
    input: {
      padding: '14px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    // Стил за бутона
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
    // Цвят при задържане с мишката
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* Регистрационна форма */}
      <form style={styles.card} onSubmit={handleRegister}>
        <h2 style={styles.title}>Регистрация</h2>

        {/* Име на потребителя */}
        <div>
          <label>Име:</label>
          {/* ref връзка към input полето */}
          <input type="text" ref={nameRef} required />
        </div>

        {/* Имейл */}
        <div>
          <label>Имейл:</label>
          <input type="email" ref={emailRef} required />
        </div>

        {/* Парола */}
        <div>
          <label>Парола:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        {/* Бутон за регистрация със стил и hover ефект */}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Регистрация
        </button>
      </form>
    </div>
  );
}

export default Register;
